import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
              private _router: Router, private _metaTitle: Title) { 
    this.isResponse = false;
  }

  ngOnInit(): void {
    this._metaTitle.setTitle('Bhagvad Gita Chapters');
    const keywords = 'Arjuna Visada Yoga,Sankhya Yoga,Karma Yoga,Jnana Karma Sanyasa Yoga,Karma Sanyasa Yoga,Dhyana Yoga,Gyaan Vigyana Yoga,Akshara Brahma Yoga,Raja Vidya Yoga,Vibhooti Yoga,Vishwaroopa Darshana Yoga,Bhakti Yoga,Ksetra Ksetrajna Vibhaaga Yoga,Gunatraya Vibhaga Yoga,Purushottama Yoga,Daivasura Sampad Vibhaga Yoga,Sraddhatraya Vibhaga Yoga,Moksha Sanyaas Yoga, Bhagavad Gita, Gita, Bhagavad Gita teachings, Krishna, Arjuna, Hinduism, Indian philosophy, Yoga, Karma, Dharma, Bhakti yoga, Meditation, Vedanta, Upanishads, Bhagavad Gita quotes, Bhagavad Gita in English, Bhagavad Gita translations, Bhagavad Gita study guide, Bhagavad Gita for beginners, Bhagavad Gita audio'

    this._canonicalService.createCanonicalLink();
    this._canonicalService.updateMetaTags({metaTitle: 'Bhagvad Gita Chapters',
    description: 'In the Bhagavad Gita, there are a total of 18 chapters, out of which 1st to 6th is talk about how one should do his duties and is called Karma Yoga.The second set of 6 chapters from chapter 7th to 12th is called as Bhakti Yoga.The third set of 6 chapters from chapter 13th to 18th is called as Jaana Yoga',
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
