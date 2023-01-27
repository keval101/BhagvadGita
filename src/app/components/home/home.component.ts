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
    this._metaTitle.setTitle('Bhagvad Gita Description');
    this._canonicalService.createCanonicalLink();
    const description = 'Bhagavad-gita, comprised of 700 Sanskrit verses, this is India’s single most important literary and philososphical contribution. It stands unrivalled as a timeless classic its message just as valid and relevant today as 5,000 years ago when it was first spoken and recorded.'
    const keywords = 'Bhagavad Gita, Gita, Bhagavad Gita teachings, Krishna, Arjuna, Hinduism, Indian philosophy, Yoga, Karma, Dharma, Bhakti yoga, Meditation, Vedanta, Upanishads, Bhagavad Gita quotes, Bhagavad Gita in English, Bhagavad Gita translations, Bhagavad Gita study guide, Bhagavad Gita for beginners, Bhagavad Gita audio'
    // const keywords = 'Bhagvad gita, BhagavadGita, bhagavad gita, bhagavad gita quotes, karma bhagavad gita quotes in hindi, positive thinking bhagavad gita quotes, bhagavad gita pdf, bhagavad gita api, bhagavad gita website, bhagavad gita web, bhagavad gita in hindi, the bhagavad gita, bhagavad gita summary, sri bhagavad gita, bhagavad gita english, slokas in bhagavad gita, bhagavad gita online'
    this._canonicalService.updateMetaTags({
      metaTitle: 'Bhagvad Gita Description',
      description: description,
      keywords: keywords
    })
  }

  redirectToChapter(): void {
    this._router.navigate(['chapters']);
  }

}
