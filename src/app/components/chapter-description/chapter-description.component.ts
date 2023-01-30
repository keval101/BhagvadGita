import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
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
  
  readonly chapters$: Observable<any> = this._activatedRoute.data
  .pipe(
    pluck('chapter'),
    tap(chapter => console.log(chapter))
);

  constructor(
    private _dataService: DataService, 
    private _router: Router,
    private _activatedRoute: ActivatedRoute, private _meta: Meta,
    private _metaTitle: Title, private _canonicalService: CanonicalService) { 
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

  ngOnInit(): void {
    this._activatedRoute.params.subscribe( params => this.chapterID = params['chapId'] );
    this._dataService.getChapter(this.chapterID).subscribe( response => {
      this.chapter = response;
      this.isChapterResponse = true;

      this._metaTitle.setTitle(`Bhagavad Gita Chapter ${this.chapter.chapter_number} - ${this.chapter.name_translated}`);
      // update meta tag
      this._canonicalService.createCanonicalLink();
      const keywords = `${this.chapter.name_translated}, bhagavad gita chapter ${this.chapter.chapter_number}, ${this.chapter.name_meaning}, ${this.chapter.name}, ${this.chapter.slug}, bhagavad gita ${this.chapter.chapter_number} adhyay`
      this._canonicalService.updateMetaTags({ metaTitle: this.chapter.name_translated, description: this.chapter.chapter_summary, keywords: keywords});
    })

    console.log(this.chapter);
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
    console.log(verse);
    if(verse <= this.verses.length) {
      this._router.navigate(['verse', verse], {relativeTo: this._activatedRoute});
    } else {
      this.isLargerNumber = true;
    }
  }

  onVerseKeyup(event): void {
    this.isLargerNumber = false;
    console.log(event);
  }

  
  
}
