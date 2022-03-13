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

  constructor(private _dataService: DataService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe( params => this.chapterID = params['id'] );
    this._dataService.getChapter(this.chapterID).subscribe( response => {
      console.log(response);
    })
  }

}
