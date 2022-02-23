import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  svg: any;
  constructor(private _dataService: DataService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this._dataService.getSloks().subscribe(
      response => console.log(response)
    );
  }

}
