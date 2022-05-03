import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
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
  constructor(private _router: Router, private _meta: Meta) {}
  ngOnInit(): void {
    this._meta.addTags([
      { name: "description", content:"" },
      { name: 'keywords', content: '' },
      { name: 'author', content: 'Keval Vadhiya' },
    ])

    if( /Android|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.isMobileScreen = true;
    } else {
      this.isMobileScreen = false;
    }
    const defaultLang = { name: 'English', code: 'EN'}
    localStorage.setItem('selectedLang', JSON.stringify(defaultLang));
  }

  ngAfterContentChecked(): void {
    this._router.url === '/login' ? this.isLogin = true : this.isLogin = false;
  }
  
  openMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }
}
