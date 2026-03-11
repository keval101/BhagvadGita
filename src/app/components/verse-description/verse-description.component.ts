import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { CanonicalService } from 'src/app/services/canonical.service';
import { DataService } from 'src/app/services/data.service';

const BASE_URL = 'https://bhagvad-gita.vercel.app';
const VERSES_PER_CHAPTER: { [key: number]: number } = {
  1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30,
  8: 28, 9: 34, 10: 42, 11: 55, 12: 20, 13: 35, 14: 27,
  15: 20, 16: 24, 17: 28, 18: 78
};

@Component({
  selector: 'app-verse-description',
  templateUrl: './verse-description.component.html',
  styleUrls: ['./verse-description.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerseDescriptionComponent implements OnInit {

  chapterNumber: number;
  verseNumber: number;
  verse: any;
  isResponse: boolean;
  isChangeVerse = new Subject()
  summaries = [];
  selectedSummary: {description: string, author: string} = {
    description: '',
    author: ''
  }
  isSummaryOpen: boolean;
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _metaTitle: Title,
              private _dataService: DataService, private _canonicalService: CanonicalService) {

    this.isChangeVerse.subscribe(
      res => {
        setTimeout(() => {
          this.getVerse();
        }, 500);
      })

   }

  ngOnInit(): void {
    this.getVerse();
  }

  previousSloka(): void {
    const previousVerse = this.verse.verse_number - 1;
    this._router.navigate([`chapter/${this.verse.chapter_number}/verse/${previousVerse}`])
    this.isChangeVerse.next();
    this.isResponse = false;
  }

  nextSloka(): void {
    const previousVerse = this.verse.verse_number + 1;
    this._router.navigate([`chapter/${this.verse.chapter_number}/verse/${previousVerse}`])
    this.isChangeVerse.next();
    this.isResponse = false;
  }

  getVerse(): void {
    this._activatedRoute.params.subscribe(
      params => {
        this.verseNumber = params['verseId'];
        this.chapterNumber = params['chapId'];
        this.summaries = [];
      })

    this._dataService.getVerse(this.chapterNumber, this.verseNumber).subscribe(
      res => {
        this.verse = res;
        const title = `Bhagavad Gita Chapter ${res.chapter_number}, Verse ${res.verse_number} – Meaning & Explanation`
        const description = `Read Bhagavad Gita Chapter ${res.chapter_number}, Verse ${res.verse_number} in Sanskrit with English translation and detailed explanation. Discover the spiritual meaning and essence of this verse.`;
        const keywords = `Bhagavad Gita ${res.chapter_number}.${res.verse_number},Gita sloka ${res.chapter_number}.${res.verse_number} meaning,Bhagavad Gita English translation,Sanskrit shlokas with meaning,Bhagavad Gita verse ${res.chapter_number}.${res.verse_number} explanation,Gita verse ${res.chapter_number}.${res.verse_number} summary`

        this._metaTitle.setTitle(title)
        this._canonicalService.createCanonicalLink();

        const totalVerses = VERSES_PER_CHAPTER[res.chapter_number] || 0;
        const prevUrl = res.verse_number > 1
          ? `${BASE_URL}/chapter/${res.chapter_number}/verse/${res.verse_number - 1}`
          : undefined;
        const nextUrl = res.verse_number < totalVerses
          ? `${BASE_URL}/chapter/${res.chapter_number}/verse/${res.verse_number + 1}`
          : undefined;
        this._canonicalService.setPaginationLinks(prevUrl, nextUrl);

        this._canonicalService.setStructuredData([
          {
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
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': `Chapter ${res.chapter_number}`,
                'item': `https://bhagvad-gita.vercel.app/chapter/${res.chapter_number}`
              },
              {
                '@type': 'ListItem',
                'position': 4,
                'name': `Verse ${res.verse_number}`,
                'item': `https://bhagvad-gita.vercel.app/chapter/${res.chapter_number}/verse/${res.verse_number}`
              }
            ]
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': title,
            'description': description,
            'url': `https://bhagvad-gita.vercel.app/chapter/${res.chapter_number}/verse/${res.verse_number}`,
            'image': 'https://bhagvad-gita.vercel.app/assets/krishna-arjuna.jpg',
            'author': {
              '@type': 'Person',
              'name': 'Ved Vyasa'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Bhagavad Gita Online',
              'url': 'https://bhagvad-gita.vercel.app',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://bhagvad-gita.vercel.app/assets/logo2.png'
              }
            },
            'inLanguage': 'en',
            'isPartOf': {
              '@type': 'Book',
              'name': 'Bhagavad Gita',
              'url': 'https://bhagvad-gita.vercel.app'
            }
          }
        ]);
        this.isResponse = true;
        if(res.chapter_number === 12 || res.chapter_number === 13|| res.chapter_number === 14 || res.chapter_number === 15 ||
          res.chapter_number === 16 || res.chapter_number === 17 || res.chapter_number === 18) {
            res.text = res.text.replace('\n\n', '');
            res.text = res.text.replace('।\n\n', '।');
            res.text = res.text.replace('।', '।\n\n');
          }
        this._canonicalService.updateMetaTags({ metaTitle: title, description: description, keywords: keywords});
        res.commentaries.map(
          summary => {
            if(summary.language === 'hindi' || summary.language === 'english') {
              this.summaries.push(summary);
            }
          })
      },
      (error) => {
        this.isResponse = true;
      })
  }

  readSummary(summary_description, summary_author): void {
    this.selectedSummary = {
      description: summary_description,
      author: summary_author
    }
    this.isSummaryOpen = true
  }
}
