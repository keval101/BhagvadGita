import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIinterceptorService implements HttpInterceptor {

  constructor() { }
  API_URL = 'https://bhagavad-gita3.p.rapidapi.com/v2';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({ url: `${this.API_URL}/${request.url}`, setHeaders: {
        'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com',
        'x-rapidapi-key': '390d194e23mshc197e2549dfec2ap1e776fjsn41258817eb2f'
    }});
    return next.handle(apiReq);
  }
}
