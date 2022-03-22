import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChaptersComponent implements OnInit {

  totalChapters = [];
  isResponse: boolean;
  constructor(private _dataService: DataService, private _router: Router) { 
    this.isResponse = false;
  }

  ngOnInit(): void {
    this._dataService.getAllChapters().subscribe(
      response => {
        this.totalChapters = response;
        this.isResponse = true;
      })
  }

  gotoChapter(id: number): void {
    this._router.navigate(['chapter', id])
  }
}
