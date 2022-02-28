import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor(private _dataService: DataService) { }
  ngOnInit(): void {
    this._dataService.getAllChapters().subscribe(
      res => console.log(res)
    )
    this._dataService.getChapter(1).subscribe(
      res => console.log(res)
    )
  }

}
