import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss']
})
export class ChaptersComponent implements OnInit {

  totalChapters = [];
  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit(): void {
    this._dataService.getAllChapters().subscribe(
      response => {
        this.totalChapters = response;
        console.log(response)
      })
  }

  gotoChapter(id: number): void {
    console.log(id);
    this._router.navigate(['chapter', id])
  }
}
