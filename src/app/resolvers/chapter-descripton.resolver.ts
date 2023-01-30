import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CanonicalService } from '../services/canonical.service';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ChapterDescriptonResolver implements Resolve<boolean> {
  data: any;
  constructor(private readonly _dataService: DataService, private _metaTitle: Title, private _canonicalService: CanonicalService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const chapterID = route.paramMap.get('chapId');

    this._dataService.getChapter(Number(chapterID)).subscribe(response => {
      const chapter = response;
      this.data = response;
      // this.isChapterResponse = true;

      this._metaTitle.setTitle(`Bhagavad Gita Chapter ${chapter.chapter_number} - ${chapter.name_translated}`);
      // update meta tag
      this._canonicalService.createCanonicalLink();
      const keywords = `${chapter.name_translated}, bhagavad gita chapter ${chapter.chapter_number}, ${chapter.name_meaning}, ${chapter.name}, ${chapter.slug}, bhagavad gita ${chapter.chapter_number} adhyay`
      this._canonicalService.updateMetaTags({ metaTitle: chapter.name_translated, description: chapter.chapter_summary, keywords: keywords});
    })

    console.log(this.data)
    return this.data;
    // return of(true);
  }
}
