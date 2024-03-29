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
    this._metaTitle.setTitle('Bhagavad Gita Chapters: A Complete List');
    const keywords = 'Arjuna Visada Yoga,Sankhya Yoga,Karma Yoga,Jnana Karma Sanyasa Yoga,Karma Sanyasa Yoga,Dhyana Yoga,Gyaan Vigyana Yoga,Akshara Brahma Yoga,Raja Vidya Yoga,Vibhooti Yoga,Vishwaroopa Darshana Yoga,Bhakti Yoga,Ksetra Ksetrajna Vibhaaga Yoga,Gunatraya Vibhaga Yoga,Purushottama Yoga,Daivasura Sampad Vibhaga Yoga,Sraddhatraya Vibhaga Yoga,Moksha Sanyaas Yoga, Bhagavad Gita, Gita, Bhagavad Gita teachings, Krishna, Arjuna, Hinduism, Indian philosophy, Yoga, Karma, Dharma, Bhakti yoga, Meditation, Vedanta, Upanishads, Bhagavad Gita quotes, Bhagavad Gita in English, Bhagavad Gita translations, Bhagavad Gita study guide, Bhagavad Gita for beginners, Bhagavad Gita audio, Bhagavad Gita chapters, List of Bhagavad Gita chapters, Bhagavad Gita chapter summaries, Bhagavad Gita online by chapter'

    this._canonicalService.createCanonicalLink();
    this._canonicalService.updateMetaTags({metaTitle: 'Bhagavad Gita Chapters: A Complete List',
    description: 'Explore all 18 chapters of the Bhagavad Gita with clear descriptions. Jump right to the chapter that interests you and delve into its timeless wisdom.',
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
