import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  API_URL = 'https://bhagavad-gita3.p.rapidapi.com/v2';
  header = {
    'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com',
    'x-rapidapi-key': '390d194e23mshc197e2549dfec2ap1e776fjsn41258817eb2f'
  }
  isLangChage = new Subject();
  constructor(private _http: HttpClient) { }

  //get all chapters
  getAllChapters(): Observable<any> {
    return this._http.get(`${this.API_URL}/chapters/?limit=18`, {headers: this.header});
  }

  //get particular chapter
  getChapter(chapter: number): Observable<any> {
    return this._http.get(`${this.API_URL}/chapters/${chapter}/`, {headers: this.header});
  }

  //get all verse of particular chapter
  getAllVerses(chapter: number): Observable<any> {
    return this._http.get(`${this.API_URL}/chapters/${chapter}/verses/`, {headers: this.header});
  }

  //get particular verse
  getVerse(chapter: number, verse: number): Observable<any> {
    return this._http.get(`${this.API_URL}/chapters/${chapter}/verses/${verse}/`, {headers: this.header});
  }
}
