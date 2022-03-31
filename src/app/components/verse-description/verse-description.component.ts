import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CanonicalService } from 'src/app/services/canonical.service';
import { DataService } from 'src/app/services/data.service';

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
        const title = `Bhagvad Gita ${res.chapter_number}.${res.verse_number}`
        const keywords = `bhagavad gita chapter ${res.chapter_number} slok ${res.verse_number}, bhagavad gita adhay ${res.chapter_number} slok ${res.verse_number}`
        this._metaTitle.setTitle(title)
        this._canonicalService.createCanonicalLink();
        this._canonicalService.updateMetaTags({ metaTitle: title, description:`श्रीमद्भगवद्‌गीता: ${res.chapter_number}.${res.verse_number}`, keywords: keywords});
        this.isResponse = true;
          if(res.chapter_number === 12 || res.chapter_number === 13|| res.chapter_number === 14 || res.chapter_number === 15 ||
            res.chapter_number === 16 || res.chapter_number === 17 || res.chapter_number === 18) {
            res.text = res.text.replace('\n\n', '');
            res.text = res.text.replace('।\n\n', '।');
            res.text = res.text.replace('।', '।\n\n');
          }
        res.commentaries.map(
          summary => {
            if(summary.language === 'hindi' || summary.language === 'english') {
              this.summaries.push(summary);
            }
          })
      })
  }

  readSummary(summary_description, summary_author): void {
    console.log(summary_description, summary_author);
    this.selectedSummary = {
      description: summary_description,
      author: summary_author
    }
    this.isSummaryOpen = true
  }
}
