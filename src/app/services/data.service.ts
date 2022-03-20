import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  //get all chapters
  getAllChapters(): Observable<any> {
    return this._http.get(`chapters/?limit=18`,);
  }

  //get particular chapter
  getChapter(chapter: number): Observable<any> {
    return this._http.get(`chapters/${chapter}/`,);
  }

  //get all verse of particular chapter
  getAllVerses(chapter: number): Observable<any> {
    return this._http.get(`chapters/${chapter}/verses/`,);
  }

  //get particular verse
  getVerse(chapter: number, verse: number): Observable<any> {
    return this._http.get(`chapters/${chapter}/verses/${verse}/`,);
  }
}
