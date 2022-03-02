import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss']
})
export class ChaptersComponent implements OnInit {

  totalChapters = [];
  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this._dataService.getAllChapters().subscribe(
      response => {
        this.totalChapters = response;
        console.log(response)
      })
  }

}
