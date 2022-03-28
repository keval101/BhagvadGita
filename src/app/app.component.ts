import { Location } from '@angular/common';
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
    window.screen.availWidth < 600 ? this.isMobileScreen = true : this.isMobileScreen = false;
    this._meta.addTags([
      { name: "description", content:"Bhagavad-gita, comprised of 700 Sanskrit verses, this is India’s single most important literary and philososphical contribution. It stands unrivalled as a timeless classic its message just as valid and relevant today as 5,000 years ago when it was first spoken and recorded." },
      { name: 'keywords', content: 'Bhagvad-gita' },
      { name: 'author', content: 'Keval Vadhiya' },
    ])
  }

  ngAfterContentChecked(): void {
    this._router.url === '/login' ? this.isLogin = true : this.isLogin = false;
  }
  
  openMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }
}
