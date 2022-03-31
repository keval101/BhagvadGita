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
      { name: "description", content:"" },
      { name: 'keywords', content: '' },
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
