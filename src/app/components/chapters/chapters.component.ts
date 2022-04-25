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
  isEnglish = true;
  englishSummary = `
  In the Bhagavad Gita, there are a total of 18 chapters, out of which <span class="primary-text-color">1st to 6th</span> is talk about how one should do his duties and is called
  <span class="primary-text-color">Karma Yoga</span>.
  <br>
  The second set of 6 chapters from chapter <span class="primary-text-color">7th to 12th</span> is called as <span class="primary-text-color">Bhakti Yoga</span>.
  <br>
  The third set of 6 chapters from chapter <span class="primary-text-color">13th to 18th</span> is called as <span class="primary-text-color">Jaana Yoga</span>.
  `;
  hindiSummary = `
    भगवद गीता में कुल 18 अध्याय हैं, जिनमें से <span class="primary-text-color">1 से 6वें</span> अध्याय में बताया गया है कि व्यक्ति को अपने कर्तव्यों का पालन कैसे करना चाहिए और इसे <span class="primary-text-color">कर्म योग</span> कहा जाता है।
    <span class="primary-text-color">7वें से 12वें</span> अध्याय तक 6 अध्यायों के दूसरे समूह को <span class="primary-text-color">भक्ति योग</span> कहा जाता है।
    <span class="primary-text-color">13वें से 18वें</span> अध्याय तक 6 अध्यायों के तीसरे समूह को <span class="primary-text-color">जन योग</span> कहा जाता है।
  `
  constructor(private _dataService: DataService, private _canonicalService: CanonicalService,
              private _router: Router, private _metaTitle: Title) { 
    this.isResponse = false;
    
    this.changeLang();
    this._dataService.isLangChage.subscribe(
      res => {
        this.changeLang();
      }
    )
  }

  ngOnInit(): void {
    this._metaTitle.setTitle('Bhagvad Gita Chapters');
    const keywords = 'Arjuna Visada Yoga,Sankhya Yoga,Karma Yoga,Jnana Karma Sanyasa Yoga,Karma Sanyasa Yoga,Dhyana Yoga,Gyaan Vigyana Yoga,Akshara Brahma Yoga,Raja Vidya Yoga,Vibhooti Yoga,Vishwaroopa Darshana Yoga,Bhakti Yoga,Ksetra Ksetrajna Vibhaaga Yoga,Gunatraya Vibhaga Yoga,Purushottama Yoga,Daivasura Sampad Vibhaga Yoga,Sraddhatraya Vibhaga Yoga,Moksha Sanyaas Yoga'

    this._canonicalService.createCanonicalLink();
    this._canonicalService.updateMetaTags({metaTitle: 'Bhagvad Gita Chapters',
    description: 'In the Bhagavad Gita, there are a total of 18 chapters, out of which 1st to 6th is talk about how one should do his duties and is called Karma Yoga.The second set of 6 chapters from chapter 7th to 12th is called as Bhakti Yoga.The third set of 6 chapters from chapter 13th to 18th is called as Jaana Yoga',
    keywords: keywords
  });    

    this._dataService.getAllChapters().subscribe(
      response => {
        this.totalChapters = response;
        this.totalChapters.map(
          response => {
            response.name = response.name.replace('योग', ' योग');
          })
        console.log(this.totalChapters);
        this.isResponse = true;
      })
  }

  gotoChapter(id: number): void {
    this._router.navigate(['chapter', id])
  }

  changeLang(): void {
    const selectedLang = JSON.parse(localStorage.getItem('selectedLang'));
    if(selectedLang.code === 'EN') {
      this.isEnglish = true;
      console.log('en');
    } else {
      this.isEnglish = false;
      console.log('hn');
    }
  }
}
