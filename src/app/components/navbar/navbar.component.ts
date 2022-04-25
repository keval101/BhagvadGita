import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  @Output() closeSidebar = new EventEmitter();
  langague = [ 
    { name: 'Hindi', code: 'HN' },
    { name: 'English', code: 'EN'}
  ]
  selectedLang;
  constructor(private _dataService: DataService) { }
  ngOnInit(): void {
    this.selectedLang = JSON.parse(localStorage.getItem('selectedLang'));
  }

  closeMenu(): void {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      setTimeout(() => {
        this.closeSidebar.emit();
      }, 200);
     }
  }

  changeLang(lang): void {
    console.log(lang);
    localStorage.setItem('selectedLang', JSON.stringify(lang));
    this._dataService.isLangChage.next();
  }

}
