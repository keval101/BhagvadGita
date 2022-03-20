import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private _dataService: DataService, 
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { 
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
    })

    this._dataService.getAllVerses(this.chapterID).subscribe( response => {
      this.verses = response;
      this.isResponse = true;
    })
  }

  onPageChange(pageNumber): void {
    this.selectedPage = pageNumber;
  }

  redirectToVerse(verse: number): void {
    this._router.navigate(['verse', verse], {relativeTo: this._activatedRoute});
  }
  
}
