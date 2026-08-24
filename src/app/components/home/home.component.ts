import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ALL_CHAPTERS } from 'src/app/seo/gita.data';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  chapters = ALL_CHAPTERS;
  karmaChapters = ALL_CHAPTERS.filter(chapter => chapter.yogaPath === 'Karma Yoga');
  bhaktiChapters = ALL_CHAPTERS.filter(chapter => chapter.yogaPath === 'Bhakti Yoga');
  jnanaChapters = ALL_CHAPTERS.filter(chapter => chapter.yogaPath === 'Jnana Yoga');

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    const title = 'Bhagavad Gita – Complete Sanskrit Text with English Translation & Meaning';
    const description = 'Read the complete Bhagavad Gita online: all 18 chapters and 700 verses in Sanskrit, with English translation, Hindi meaning, commentary, and spiritual teachings.';
    this.seo.update({
      title,
      description,
      path: '/',
      robots: 'index, follow',
      keywords: 'Bhagavad Gita, Sanskrit verses, English translation, Hindi meaning, Krishna, Arjuna, karma yoga, bhakti yoga, jnana yoga',
      jsonLd: [
        this.seo.webPage({ name: title, description, path: '/' }),
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Bhagavad Gita',
          url: 'https://bhagvad-gita.vercel.app',
          description,
          inLanguage: 'en'
        }
      ]
    });
  }
}
