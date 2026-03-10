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
    this._metaTitle.setTitle('Bhagavad Gita Chapters – Summary of All 18 Chapters');
    const keywords = `Bhagavad Gita, Gita, Srimad Bhagavad Gita, Bhagavad Gita teachings, Krishna and Arjuna, Indian philosophy, Hinduism, Dharma, Karma, Yoga, Bhakti yoga, Meditation, Vedanta, Upanishads, Gita quotes, Bhagavad Gita in English, Bhagavad Gita translations, Bhagavad Gita audio, Bhagavad Gita study guide, Gita for beginners, Gita online, Bhagavad Gita chapters, Bhagavad Gita verse meanings, Chapter summaries, Gita slokas, Gita in Sanskrit, Arjuna Visada Yoga, Sankhya Yoga, Karma Yoga, Jnana Karma Sanyasa Yoga, Karma Sanyasa Yoga, Dhyana Yoga, Gyaan Vigyana Yoga, Akshara Brahma Yoga, Raja Vidya Yoga, Vibhooti Yoga, Vishwaroopa Darshana Yoga, Bhakti Yoga, Ksetra Ksetrajna Vibhaaga Yoga, Gunatraya Vibhaga Yoga, Purushottama Yoga, Daivasura Sampad Vibhaga Yoga, Sraddhatraya Vibhaga Yoga, Moksha Sanyaas Yoga`;

    this._canonicalService.createCanonicalLink();
    this._canonicalService.updateMetaTags({
      metaTitle: 'Bhagavad Gita Chapters – Summary of All 18 Chapters',
      description: 'Explore all 18 chapters of the Bhagavad Gita. Understand the essence of each chapter with Sanskrit names, titles, and summaries.',
      keywords: keywords
    });
    this._canonicalService.setStructuredData({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://bhagvad-gita.vercel.app/home'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'All 18 Chapters',
          'item': 'https://bhagvad-gita.vercel.app/chapters'
        }
      ]
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
