import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() closeSidebar = new EventEmitter();
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  closeMenu(): void {
    if (this.isBrowser && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setTimeout(() => {
        this.closeSidebar.emit();
      }, 200);
    }
  }
}
