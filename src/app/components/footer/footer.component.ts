import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ALL_CHAPTERS } from 'src/app/seo/gita.data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  chapters = ALL_CHAPTERS;

  constructor() { }

  ngOnInit(): void {
  }
}
