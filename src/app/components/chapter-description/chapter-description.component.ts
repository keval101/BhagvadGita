import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CanonicalService } from 'src/app/services/canonical.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chapter-description',
  templateUrl: './chapter-description.component.html',
  styleUrls: ['./chapter-description.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChapterDescriptionComponent implements OnInit {
  chapterID: any;
  chapter: any;
  isResponse: boolean;
  isChapterResponse: boolean;
  verses = [];
  selectedPage: number = 1;
  showPage = 12;
  isMobileScreen: boolean;
  selectedVerse: number;
  isLargerNumber: boolean;
  isBrowser: boolean;

  constructor(
    private _dataService: DataService, 
    private _router: Router,
    private _activatedRoute: ActivatedRoute, private _meta: Meta,
    private _metaTitle: Title, private _canonicalService: CanonicalService,
    @Inject(PLATFORM_ID) private platformId: any) { 
      this.isBrowser = isPlatformBrowser(this.platformId);

      if (this.isBrowser) {
        if(window.screen.width < 1367) {
          this.showPage = 9;
        }
        if(window.screen.width < 768) {
          this.showPage = 8;
        }
        if(window.screen.width < 600) {
          this.isMobileScreen = true;
        }
      }
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe( params => this.chapterID = params['chapId'] );
    this._dataService.getChapter(this.chapterID).subscribe( response => {
      this.chapter = response;
      this.isChapterResponse = true;

      this._metaTitle.setTitle(`Bhagavad Gita Chapter ${this.chapter.chapter_number}: ${this.chapter.name_translated} | Summary & Verses`);
      this._canonicalService.createCanonicalLink();
      const keywords = `Bhagavad Gita Chapter ${this.chapter.chapter_number},${this.chapter.name_translated},Bhagavad Gita ${this.chapter.chapter_number} summary,${this.chapter.name_translated} meaning,Gita Chapter ${this.chapter.chapter_number},Chapter ${this.chapter.chapter_number} of Bhagavad Gita,${this.chapter.name_translated} explanation,Bhagavad Gita slokas Chapter ${this.chapter.chapter_number},${this.chapter.name_translated} Sanskrit verses`;
      this._canonicalService.updateMetaTags({
        metaTitle: `Bhagavad Gita Chapter ${this.chapter.chapter_number}: ${this.chapter.name_translated} | Summary & Verses`,
        description: `Read Chapter ${this.chapter.chapter_number}: ${this.chapter.name_translated}. Understand the meaning of this chapter and read all Sanskrit verses with explanations.`,
        keywords: keywords
      });
      this._canonicalService.setStructuredData({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://bhagvad-gita.vercel.app/home'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'All 18 Chapters',
            'item': 'https://bhagvad-gita.vercel.app/chapters'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': `Chapter ${this.chapter.chapter_number}: ${this.chapter.name_translated}`,
            'item': `https://bhagvad-gita.vercel.app/chapter/${this.chapter.chapter_number}`
          }
        ]
      });
    })

    this._dataService.getAllVerses(this.chapterID).subscribe( response => {
      this.verses = response;
      this.isResponse = true;
      this.verses.map(
        response => {
          if(response.chapter_number === 12 || response.chapter_number === 13 || response.chapter_number === 14 ||
            response.chapter_number === 15 || response.chapter_number === 16 || 
            response.chapter_number === 17 || response.chapter_number === 18) {
            response.text = response.text.replace('\n\n', '');
            response.text = response.text.replace('।\n\n', '।');
            response.text = response.text.replace('।', '।\n\n');
          }})
    })
  }

  onPageChange(pageNumber): void {
    this.selectedPage = pageNumber;
  }

  redirectToVerse(verse: number): void {
    if(verse <= this.verses.length) {
      this._router.navigate(['verse', verse], {relativeTo: this._activatedRoute});
    } else {
      this.isLargerNumber = true;
    }
  }
  
  keydownOnVerse(verse: number, event: any) {
    if(event.key === 'Enter') {
      this.redirectToVerse(verse)
    }
  } 

}
