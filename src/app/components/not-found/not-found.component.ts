import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { HttpStatusService } from 'src/app/services/http-status.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(
    private seo: SeoService,
    private httpStatus: HttpStatusService
  ) {}

  ngOnInit(): void {
    this.httpStatus.setNotFound();
    this.seo.setNotFound();
  }
}
