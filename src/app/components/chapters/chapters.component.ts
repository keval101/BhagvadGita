import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CanonicalService } from 'src/app/services/canonical.service';
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
  constructor(private _dataService: DataService, private _canonicalService: CanonicalService,
              private _router: Router, private _meta: Meta, private _metaTitle: Title) { 
    this.isResponse = false;
  }

  ngOnInit(): void {
    this._metaTitle.setTitle('Bhagvad Gita Chapters');
    const keywords = 'Arjuna Visada Yoga,Sankhya Yoga,Karma Yoga,Jnana Karma Sanyasa Yoga,Karma Sanyasa Yoga,Dhyana Yoga,Gyaan Vigyana Yoga,Akshara Brahma Yoga,Raja Vidya Yoga,Vibhooti Yoga,Vishwaroopa Darshana Yoga,Bhakti Yoga,Ksetra Ksetrajna Vibhaaga Yoga,Gunatraya Vibhaga Yoga,Purushottama Yoga,Daivasura Sampad Vibhaga Yoga,Sraddhatraya Vibhaga Yoga,Moksha Sanyaas Yoga'

    this._canonicalService.createCanonicalLink();
    this._canonicalService.socialMetaTags(
      {metaTitle: 'Bhagvad Gita Chapters',
      description: 'Bhagvad Gita has 18 adhyay.',
      keywords: keywords
    });

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
