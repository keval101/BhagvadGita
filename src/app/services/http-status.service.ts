import { Injectable, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { SSR_RESPONSE } from '../seo/ssr-tokens';

@Injectable({
  providedIn: 'root'
})
export class HttpStatusService {
  constructor(
    @Optional() @Inject(SSR_RESPONSE) private response: any,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  setStatus(code: number): void {
    if (isPlatformServer(this.platformId) && this.response && typeof this.response.status === 'function') {
      this.response.status(code);
    }
  }

  setNotFound(): void {
    this.setStatus(404);
  }
}
