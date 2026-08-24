import { Injectable } from '@angular/core';
import { SeoService, SeoPageConfig } from './seo.service';
import { IMetaTags } from '../interface/interface';

/** @deprecated Use SeoService.update() */
@Injectable({
  providedIn: 'root'
})
export class CanonicalService {
  constructor(private seo: SeoService) {}

  createCanonicalLink(url?: string): void {
    if (url) {
      this.seo.update({
        title: '',
        description: '',
        path: url.replace('https://bhagvad-gita.vercel.app', '') || '/'
      });
    }
  }

  updateMetaTags(tags: IMetaTags): void {
    this.seo.update({
      title: tags.metaTitle,
      description: tags.description || '',
      path: '/',
      keywords: tags.keywords
    });
  }

  setStructuredData(schema: object | object[]): void {
    this.seo.update({
      title: '',
      description: '',
      path: '/',
      jsonLd: schema
    } as SeoPageConfig);
  }

  setPaginationLinks(): void {}
  removeStructuredData(): void {}
}
