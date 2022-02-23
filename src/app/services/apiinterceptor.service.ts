import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIinterceptorService implements HttpInterceptor {

  constructor() { }
  API_URL = 'https://bhagavadgitaapi.in';
  API_KEY = 'd9b0b345e427dddfa';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('yeso')
    const apiReq = request.clone({ url: `${this.API_URL}/${request.url}`, setParams: {
      'api_key': this.API_KEY
    }}, );
    return next.handle(apiReq);
  }
}
