import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { IMetaTags } from '../interface/interface';

const BASE_URL = 'https://bhagvad-gita.vercel.app';
const OG_IMAGE = `${BASE_URL}/assets/krishna-arjuna.jpg`;

@Injectable({
  providedIn: 'root'
})
export class CanonicalService {
  isBrowser: boolean;
  pageUrl: string;

  constructor(
    @Inject(DOCUMENT) private dom,
    private _meta: Meta,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  createCanonicalLink(url?: string): void {
    if (this.isBrowser) {
      const canURL = url ?? this.dom.URL;
      this.pageUrl = canURL;

      let link: HTMLLinkElement = this.dom.querySelector('link[rel="canonical"]');
      if (link) {
        link.setAttribute('href', canURL);
      } else {
        link = this.dom.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', canURL);
        this.dom.head.appendChild(link);
      }
    }
  }

  updateMetaTags(tagsDescription: IMetaTags): void {
    this._meta.updateTag({ name: 'description', content: tagsDescription.description }, "name='description'");
    this._meta.updateTag({ name: 'keywords', content: tagsDescription.keywords }, "name='keywords'");
    this._meta.updateTag({ name: 'robots', content: 'index, follow' }, "name='robots'");
    this._meta.updateTag({ name: 'image', content: OG_IMAGE }, "name='image'");

    this._meta.updateTag({ property: 'og:type', content: 'website' }, "property='og:type'");
    this._meta.updateTag({ property: 'og:site_name', content: 'Bhagavad Gita' }, "property='og:site_name'");
    this._meta.updateTag({ property: 'og:locale', content: 'en_US' }, "property='og:locale'");
    this._meta.updateTag({ property: 'og:url', content: this.pageUrl }, "property='og:url'");
    this._meta.updateTag({ property: 'og:title', content: tagsDescription.metaTitle }, "property='og:title'");
    this._meta.updateTag({ property: 'og:description', content: tagsDescription.description }, "property='og:description'");
    this._meta.updateTag({ property: 'og:image', content: OG_IMAGE }, "property='og:image'");
    this._meta.updateTag({ property: 'og:image:secure_url', content: OG_IMAGE }, "property='og:image:secure_url'");
    this._meta.updateTag({ property: 'og:image:width', content: '1200' }, "property='og:image:width'");
    this._meta.updateTag({ property: 'og:image:height', content: '630' }, "property='og:image:height'");
    this._meta.updateTag({ property: 'og:image:alt', content: `${tagsDescription.metaTitle}` }, "property='og:image:alt'");

    this._meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' }, "name='twitter:card'");
    this._meta.updateTag({ name: 'twitter:site', content: '@BhagavadGita' }, "name='twitter:site'");
    this._meta.updateTag({ name: 'twitter:creator', content: '@KevalVadhiya' }, "name='twitter:creator'");
    this._meta.updateTag({ name: 'twitter:title', content: tagsDescription.metaTitle }, "name='twitter:title'");
    this._meta.updateTag({ name: 'twitter:description', content: tagsDescription.description }, "name='twitter:description'");
    this._meta.updateTag({ name: 'twitter:image', content: OG_IMAGE }, "name='twitter:image'");
  }

  setStructuredData(schema: object | object[]): void {
    if (this.isBrowser) {
      const existing = this.dom.getElementById('page-ld-json');
      if (existing) {
        existing.parentNode.removeChild(existing);
      }
      const script = this.dom.createElement('script');
      script.id = 'page-ld-json';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      this.dom.head.appendChild(script);
    }
  }

  removeStructuredData(): void {
    if (this.isBrowser) {
      const existing = this.dom.getElementById('page-ld-json');
      if (existing) {
        existing.parentNode.removeChild(existing);
      }
    }
  }
}
