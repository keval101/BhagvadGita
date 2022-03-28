import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
  constructor(private _dataService: DataService, private _router: Router, private _meta: Meta, private _metaTitle: Title) { 
    this.isResponse = false;
  }

  ngOnInit(): void {
    this._metaTitle.setTitle('Bhagvad Gita Chapters');

    this._meta.addTags([
      { name: "description", content:"Bhagvad Gita has 18 adhyay." },
      { name: 'keywords', content: 'Arjuna Visada Yoga,Sankhya Yoga,Karma Yoga,Jnana Karma Sanyasa Yoga,Karma Sanyasa Yoga,Dhyana Yoga,Gyaan Vigyana Yoga,Akshara Brahma Yoga,Raja Vidya Yoga,Vibhooti Yoga,Vishwaroopa Darshana Yoga,Bhakti Yoga,Ksetra Ksetrajna Vibhaaga Yoga,Gunatraya Vibhaga Yoga,Purushottama Yoga,Daivasura Sampad Vibhaga Yoga,Sraddhatraya Vibhaga Yoga,Moksha Sanyaas Yoga' },
    ]);

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
