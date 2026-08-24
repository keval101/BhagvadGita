import { isPlatformBrowser } from '@angular/common';
import { AfterContentChecked, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {
  isMenuOpen = false;
  isMobileScreen = false;
  isLogin = false;
  isBackClick = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && /Android|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobileScreen = true;
    }
  }

  ngAfterContentChecked(): void {
    this.isLogin = this.router.url === '/login';
  }

  openMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
