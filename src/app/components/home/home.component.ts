import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from 'src/app/services/canonical.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router, private _meta:Meta,
              private _metaTitle: Title, private _canonicalService: CanonicalService) { }

  ngOnInit(): void {
    this._metaTitle.setTitle('Bhagvad Gita Description');
    this._meta.addTags([
      { name: "description", content:"Sometimes called Gitopanishad (as the essence of the 108 Upanishads), Bhagavad-gita is regarded as the most important book of the Vedic literature, the vast body of ancient knowledge which is the foundation of Vedic culture, philosophy and spirituality." },
      { name: 'keywords', content: 'Bhagvad-gita' },
    ]);
    this._canonicalService.createCanonicalLink();
  }

  redirectToChapter(): void {
    this._router.navigate(['chapters']);
  }

}
