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
    this._metaTitle.setTitle('Bhagavad Gita – Complete Sanskrit Text with English Translation & Meaning');
    this._canonicalService.createCanonicalLink();
    const description = "Read the complete Bhagavad Gita online in Sanskrit with English translation and meaning. Explore the timeless wisdom of Lord Krishna's teachings on life, duty, devotion, and spirituality.";
    const keywords = 'Bhagavad Gita, Bhagvad Gita, Srimad Bhagavad Gita, Bhagavad Gita in English, Bhagavad Gita Sanskrit, Gita with meaning, Krishna teachings, Hindu scripture, Gita online, Gita slokas, Bhagavad Gita chapters, Bhagavad Gita verses, Gita quotes, spiritual guidance, karma yoga, jnana yoga, bhakti yoga';
    this._canonicalService.updateMetaTags({
      metaTitle: 'Bhagavad Gita – Complete Sanskrit Text with English Translation & Meaning',
      description: description,
      keywords: keywords
    });
    this._canonicalService.setStructuredData({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://bhagvad-gita.vercel.app/home',
      'url': 'https://bhagvad-gita.vercel.app/home',
      'name': 'Bhagavad Gita – Complete Sanskrit Text with English Translation & Meaning',
      'description': description,
      'inLanguage': 'en',
      'isPartOf': {
        '@type': 'WebSite',
        'url': 'https://bhagvad-gita.vercel.app'
      },
      'about': {
        '@type': 'Book',
        'name': 'Bhagavad Gita',
        'url': 'https://bhagvad-gita.vercel.app'
      }
    });
  }

  redirectToChapter(): void {
    this._router.navigate(['chapters']);
  }

}
