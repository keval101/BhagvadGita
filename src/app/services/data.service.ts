import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_KEY = 'd9b0b345e427dddfa';
  URL = 'https://bhagavadgitaapi.in'
  headers = {
    'X-API-KEY': this.API_KEY
  }

  constructor(private _http: HttpClient) { }

  getSloks(): Observable<any> {
    return this._http.get(`slok`,);
  }

  getGitaSvg(): Observable<any> {
    return this._http.get(`gita.svg?ch=1&sl=3`, {responseType: 'text'});
  }

}
