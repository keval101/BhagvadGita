import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { BreadcrumbItem } from 'src/app/components/breadcrumbs/breadcrumbs.component';
import { canonicalUrl, chapterPath, isValidVerse, nextVerseRef, parsePositiveInt, previousVerseRef, versePath } from 'src/app/seo/gita.data';
import { buildVersePageContent, GitaVerse, VersePageContent } from 'src/app/seo/verse-content';
import { DataService } from 'src/app/services/data.service';
import { HttpStatusService } from 'src/app/services/http-status.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-verse-description',
  templateUrl: './verse-description.component.html',
  styleUrls: ['./verse-description.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerseDescriptionComponent implements OnInit, OnDestroy {
  chapterNumber: number;
  verseNumber: number;
  page: VersePageContent;
  breadcrumbs: BreadcrumbItem[] = [];
  prevLink: string;
  nextLink: string;
  prevLabel: string;
  nextLabel: string;
  chapterLink: string;
  isResponse = false;
  isNotFound = false;
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private seo: SeoService,
    private httpStatus: HttpStatusService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        this.isResponse = false;
        this.page = undefined;
        this.isNotFound = false;
        const chapter = parsePositiveInt(params['chapId']);
        const verse = parsePositiveInt(params['verseId']);
        this.chapterNumber = chapter;
        this.verseNumber = verse;

        if (chapter == null || verse == null || !isValidVerse(chapter, verse)) {
          this.markNotFound();
          return of(null);
        }

        return this.dataService.getVerse(chapter, verse).pipe(
          catchError(() => {
            this.markNotFound();
            return of(null);
          })
        );
      })
    ).subscribe((res: GitaVerse) => {
      if (!res || !res.verse_number) {
        if (!this.isNotFound) {
          this.markNotFound();
        }
        return;
      }
      this.httpStatus.setStatus(200);
      this.page = buildVersePageContent(res);
      this.chapterNumber = res.chapter_number;
      this.verseNumber = res.verse_number;
      this.chapterLink = chapterPath(res.chapter_number);
      this.setNavigation(res.chapter_number, res.verse_number);
      this.breadcrumbs = [
        { label: 'Bhagavad Gita', url: '/' },
        { label: `Chapter ${res.chapter_number}`, url: this.chapterLink },
        { label: `Verse ${res.verse_number}` }
      ];
      this.applySeo();
      this.isNotFound = false;
      this.isResponse = true;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setNavigation(chapter: number, verse: number): void {
    const prev = previousVerseRef(chapter, verse);
    const next = nextVerseRef(chapter, verse);
    this.prevLink = prev ? versePath(prev.chapter, prev.verse) : undefined;
    this.nextLink = next ? versePath(next.chapter, next.verse) : undefined;
    this.prevLabel = prev ? `Chapter ${prev.chapter} Verse ${prev.verse}` : '';
    this.nextLabel = next ? `Chapter ${next.chapter} Verse ${next.verse}` : '';
  }

  private applySeo(): void {
    const path = versePath(this.page.chapter, this.page.verse);
    const jsonLd = [
      this.seo.webPage({
        name: this.page.title,
        description: this.page.description,
        path
      }),
      this.seo.breadcrumb([
        { name: 'Home', path: '/' },
        { name: `Chapter ${this.page.chapter}`, path: this.chapterLink },
        { name: `Verse ${this.page.verse}`, path }
      ])
    ];
    const faq = this.seo.faqPage(this.page.faqs);
    if (faq) {
      jsonLd.push(faq);
    }

    this.seo.update({
      title: this.page.title,
      description: this.page.description,
      path,
      robots: 'index, follow',
      keywords: `Bhagavad Gita ${this.page.chapter}.${this.page.verse}, ${this.page.chapterMeta.nameTranslated}, ${this.page.topic}`,
      imageAlt: this.page.h1,
      prevUrl: this.prevLink ? canonicalUrl(this.prevLink) : undefined,
      nextUrl: this.nextLink ? canonicalUrl(this.nextLink) : undefined,
      jsonLd
    });
  }

  private markNotFound(): void {
    this.isNotFound = true;
    this.isResponse = true;
    this.page = undefined;
    this.httpStatus.setNotFound();
    this.seo.setNotFound();
  }
}
