import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ALL_CHAPTERS, VERSES_PER_CHAPTER } from 'src/app/seo/gita.data';
import { DataService } from '../../services/data.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChaptersComponent implements OnInit {
  totalChapters = [];
  fallbackChapters = ALL_CHAPTERS;
  isResponse = false;

  constructor(
    private dataService: DataService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    const title = 'Bhagavad Gita Chapters – Summary of All 18 Chapters';
    const description = 'Explore all 18 chapters of the Bhagavad Gita. Read each chapter’s Sanskrit name, English title, summary, and links to every verse.';
    this.seo.update({
      title,
      description,
      path: '/chapters',
      robots: 'index, follow',
      keywords: 'Bhagavad Gita chapters, Karma Yoga, Bhakti Yoga, Jnana Yoga, Gita summaries',
      jsonLd: [
        this.seo.webPage({ name: title, description, path: '/chapters' }),
        this.seo.breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Chapters', path: '/chapters' }
        ])
      ]
    });

    this.dataService.getAllChapters().subscribe(
      response => {
        this.totalChapters = response;
        this.isResponse = true;
      },
      () => {
        this.totalChapters = this.fallbackChapters.map(chapter => ({
          id: chapter.number,
          name_translated: chapter.nameTranslated,
          verses_count: VERSES_PER_CHAPTER[chapter.number],
          name_meaning: chapter.nameMeaning
        }));
        this.isResponse = true;
      }
    );
  }
}
