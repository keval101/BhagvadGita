import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const responseCache = new Map<string, { expires: number; body: unknown }>();
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class APIinterceptorService implements HttpInterceptor {
  API_URL = 'https://bhagavad-gita3.p.rapidapi.com/v2';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({
      url: `${this.API_URL}/${request.url}`,
      setHeaders: {
        'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com',
        'x-rapidapi-key': '390d194e23mshc197e2549dfec2ap1e776fjsn41258817eb2f'
      }
    });

    if (apiReq.method === 'GET') {
      const cached = responseCache.get(apiReq.urlWithParams);
      if (cached && cached.expires > Date.now()) {
        return of(new HttpResponse({ body: cached.body, status: 200 }));
      }
    }

    return next.handle(apiReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse && apiReq.method === 'GET' && event.status === 200) {
          responseCache.set(apiReq.urlWithParams, {
            body: event.body,
            expires: Date.now() + CACHE_TTL_MS
          });
        }
      })
    );
  }
}
