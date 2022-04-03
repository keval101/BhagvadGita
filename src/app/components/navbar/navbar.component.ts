import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() closeSidebar = new EventEmitter();
  constructor() { }
  ngOnInit(): void {
  }

  closeMenu(): void {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      setTimeout(() => {
        this.closeSidebar.emit();
      }, 200);
     }
  }

}
