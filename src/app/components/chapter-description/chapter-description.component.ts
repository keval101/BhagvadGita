import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { BreadcrumbItem } from 'src/app/components/breadcrumbs/breadcrumbs.component';
import { ALL_CHAPTERS, CHAPTER_META, ChapterMeta, isValidChapter, parsePositiveInt, VERSES_PER_CHAPTER, versePath } from 'src/app/seo/gita.data';
import { formatSanskrit } from 'src/app/seo/verse-content';
import { DataService } from 'src/app/services/data.service';
import { HttpStatusService } from 'src/app/services/http-status.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-chapter-description',
  templateUrl: './chapter-description.component.html',
  styleUrls: ['./chapter-description.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChapterDescriptionComponent implements OnInit, OnDestroy {
  chapterID: number;
  chapter: any;
  chapterMeta: ChapterMeta;
  isResponse = false;
  isChapterResponse = false;
  isNotFound = false;
  verses = [];
  selectedPage = 1;
  showPage = 12;
  isMobileScreen = false;
  selectedVerse: number;
  isLargerNumber = false;
  breadcrumbs: BreadcrumbItem[] = [];
  relatedChapters = [];
  faqs: Array<{ question: string; answer: string }> = [];
  private destroy$ = new Subject<void>();

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private seo: SeoService,
    private httpStatus: HttpStatusService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      if (window.screen.width < 1367) {
        this.showPage = 9;
      }
      if (window.screen.width < 768) {
        this.showPage = 8;
      }
      if (window.screen.width < 600) {
        this.isMobileScreen = true;
      }
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        this.resetState();
        const chapterId = parsePositiveInt(params['chapId']);
        this.chapterID = chapterId;
        if (chapterId == null || !isValidChapter(chapterId)) {
          this.markNotFound();
          return of(null);
        }
        this.presentChapter(chapterId);
        return this.dataService.getChapter(chapterId).pipe(
          catchError(() => of(null))
        );
      })
    ).subscribe(response => {
      if (this.isNotFound || this.chapterID == null || !isValidChapter(this.chapterID)) {
        return;
      }
      this.presentChapter(this.chapterID, response && response.chapter_number ? response : undefined);
    });

    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const chapterId = parsePositiveInt(params['chapId']);
        if (chapterId == null || !isValidChapter(chapterId)) {
          return of([]);
        }
        return this.dataService.getAllVerses(chapterId).pipe(catchError(() => of([])));
      })
    ).subscribe(response => {
      const apiVerses = (response || []).map(verse => {
        verse.text = formatSanskrit(verse.text, verse.chapter_number);
        return verse;
      });
      this.verses = apiVerses.length
        ? apiVerses
        : this.placeholderVerses(this.chapterID);
      this.isResponse = true;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  verseHref(verseNumber: number): string {
    return versePath(this.chapterID, verseNumber);
  }

  onPageChange(pageNumber: number): void {
    this.selectedPage = pageNumber;
  }

  redirectToVerse(verse: number): void {
    if (verse && verse <= this.verses.length) {
      this.router.navigate(['/chapter', this.chapterID, 'verse', verse]);
    } else {
      this.isLargerNumber = true;
    }
  }

  keydownOnVerse(verse: number, event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.redirectToVerse(verse);
    }
  }

  private presentChapter(chapterId: number, response?: any): void {
    const meta = CHAPTER_META[chapterId];
    this.chapterID = chapterId;
    this.chapterMeta = meta;
    this.isNotFound = false;
    this.httpStatus.setStatus(200);
    this.chapter = response || {
      chapter_number: chapterId,
      name_translated: meta.nameTranslated,
      verses_count: VERSES_PER_CHAPTER[chapterId],
      chapter_summary: meta.teachings.join(' ')
    };
    this.relatedChapters = ALL_CHAPTERS.filter(item =>
      item.number === chapterId - 1
      || item.number === chapterId + 1
      || (item.yogaPath === meta.yogaPath && item.number !== chapterId)
    ).filter((item, index, list) => list.findIndex(entry => entry.number === item.number) === index)
      .slice(0, 4);
    this.faqs = this.buildFaqs();
    this.breadcrumbs = [
      { label: 'Bhagavad Gita', url: '/' },
      { label: 'Chapters', url: '/chapters' },
      { label: `Chapter ${chapterId}` }
    ];
    this.isChapterResponse = true;
    this.applySeo();
  }

  private placeholderVerses(chapterId: number): Array<{ verse_number: number; text: string }> {
    const count = VERSES_PER_CHAPTER[chapterId] || 0;
    return Array.from({ length: count }, (_, index) => ({
      verse_number: index + 1,
      text: ''
    }));
  }

  private applySeo(): void {
    const path = `/chapter/${this.chapter.chapter_number}`;
    const title = `Bhagavad Gita Chapter ${this.chapter.chapter_number}: ${this.chapter.name_translated} | ${this.chapterMeta.shortTopic}`;
    const description = this.buildDescription();
    this.seo.update({
      title,
      description,
      path,
      robots: 'index, follow',
      keywords: `Bhagavad Gita Chapter ${this.chapter.chapter_number}, ${this.chapter.name_translated}, ${this.chapterMeta.nameMeaning}`,
      jsonLd: [
        this.seo.webPage({ name: title, description, path }),
        this.seo.breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Chapters', path: '/chapters' },
          { name: `Chapter ${this.chapter.chapter_number}`, path }
        ]),
        this.seo.faqPage(this.faqs)
      ]
    });
  }

  private buildDescription(): string {
    const summary = (this.chapter.chapter_summary || this.chapterMeta.nameMeaning || '').replace(/\s+/g, ' ').trim();
    const clipped = summary.length > 120 ? summary.slice(0, 117).replace(/\s+\S*$/, '') + '…' : summary;
    return `Chapter ${this.chapter.chapter_number} of the Bhagavad Gita, ${this.chapter.name_translated}: ${clipped}`;
  }

  private buildFaqs(): Array<{ question: string; answer: string }> {
    return [
      {
        question: `What is Bhagavad Gita Chapter ${this.chapter.chapter_number} about?`,
        answer: this.chapter.chapter_summary || `${this.chapter.name_translated} presents ${this.chapterMeta.nameMeaning.toLowerCase()}.`
      },
      {
        question: `How many verses are in Chapter ${this.chapter.chapter_number}?`,
        answer: `Chapter ${this.chapter.chapter_number}, ${this.chapter.name_translated}, contains ${this.chapter.verses_count} verses.`
      }
    ];
  }

  private resetState(): void {
    this.isResponse = false;
    this.isChapterResponse = false;
    this.isNotFound = false;
    this.verses = [];
    this.selectedPage = 1;
    this.isLargerNumber = false;
  }

  private markNotFound(): void {
    this.isNotFound = true;
    this.isResponse = true;
    this.isChapterResponse = false;
    this.httpStatus.setNotFound();
    this.seo.setNotFound();
  }
}
