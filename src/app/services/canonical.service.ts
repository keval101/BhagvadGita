import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { IMetaTags } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})

export class CanonicalService {

  constructor(@Inject(DOCUMENT) private dom, private _meta: Meta) { }
  pageUrl: string
  createCanonicalLink(url?: string) {
    let canURL = url == undefined ? this.dom.URL : url;
    this.pageUrl = canURL;
    let link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }

  socialMetaTags(tagsDesctiption: IMetaTags): void {
    this._meta.addTags([
      { name: "description", content: tagsDesctiption.description},
      { name: 'keywords', content: tagsDesctiption.keywords },
    ])
    this._meta.updateTag( { name: "description", content: tagsDesctiption.description }, "name=description");
    this._meta.updateTag( { name: "keywords", content: tagsDesctiption.keywords }, "name=keywords");

    this._meta.updateTag( {name:'twitter:card', content: 'summary_large_image'}, "name=twitter:card");
    this._meta.updateTag( {name:'twitter:site', content: '@BhagavadGita'}, "name=twitter:site");
    this._meta.updateTag( {name:'twitter:creator', content: '@KevalVadhiya'}, "name=twitter:creator");
    this._meta.updateTag( {name:'twitter:title', content: tagsDesctiption.metaTitle}, "name=twitter:title");
    this._meta.updateTag( {name:'twitter:description', content: tagsDesctiption.description}, "name=twitter:description");
    this._meta.updateTag( {name:'twitter:image', content: 'https://bhagavad-gita.netlify.app/assets/krishnaArjunaa.jpg'}, "name=twitter:image");

    this._meta.updateTag( {property:'og:type', content: 'website'}, "property=og:type");
    this._meta.updateTag( {property:'og:url', content: `${this.pageUrl}`}, "property=og:url");
    this._meta.updateTag( {property:'og:title', content: tagsDesctiption.metaTitle}, "property=og:title");
    this._meta.updateTag( {property:'og:description', content: tagsDesctiption.description}, "property=og:description");
    this._meta.updateTag( {property:'og:image', content: 'https://bhagavad-gita.netlify.app/assets/krishnaArjunaa.jpg'}, "property=og:image");

  }

  updateMetaTags(description, keywords): void {
    this._meta.updateTag( { name: "description", content: description }, "name='description'");
    this._meta.updateTag( { name: "keywords", content: keywords }, "name='keywords'");
  }
}