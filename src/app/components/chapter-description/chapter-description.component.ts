import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chapter-description',
  templateUrl: './chapter-description.component.html',
  styleUrls: ['./chapter-description.component.scss']
})
export class ChapterDescriptionComponent implements OnInit {
  chapterID: any;
  chapter: any;
  isResponse: boolean;
  verses = [];
  constructor(private _dataService: DataService, private _activatedRoute: ActivatedRoute) { 
    this.isResponse = false;
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe( params => this.chapterID = params['id'] );
    this._dataService.getChapter(this.chapterID).subscribe( response => {
      this.isResponse = true;
      this.chapter = response;
      console.log(this.chapter);
    })

    this._dataService.getAllVerses(this.chapterID).subscribe( response => {
      console.log(response);
      this.verses = response;
      console.log(this.verses)
    })
  }

}
