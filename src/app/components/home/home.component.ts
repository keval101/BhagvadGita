import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from 'src/app/services/canonical.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router, private _meta:Meta,
              private _metaTitle: Title, private _canonicalService: CanonicalService) { }

  ngOnInit(): void {
    this._metaTitle.setTitle('Explore the Bhagavad Gita: Verses, Descriptions, and Summaries');
    this._canonicalService.createCanonicalLink();
    const description = 'Dive deep into the Bhagavad Gita\'s wisdom. Our website offers the complete Bhagavad Gita in English, with chapter descriptions, verse-by-verse summaries, and easy navigation.'
    const keywords = ' Bhagavad Gita, Bhagavad Gita in English, Bhagavad Gita verses, Bhagavad Gita summaries, Bhagavad Gita online, Bhagavad Gita for beginners'
    this._canonicalService.updateMetaTags({
      metaTitle: 'Explore the Bhagavad Gita: Verses, Descriptions, and Summaries',
      description: description,
      keywords: keywords
    })
  }

  redirectToChapter(): void {
    this._router.navigate(['chapters']);
  }

}
