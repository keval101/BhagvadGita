import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BhagvadGita';
  isMenuOpen = false;
  isMobileScreen = false;

  ngOnInit(): void {
    if(window.screen.availWidth < 600) {
      this.isMobileScreen = true;
    }
  }
  
  openMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }
}
