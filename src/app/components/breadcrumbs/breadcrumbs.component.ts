import { Component, Input } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input() items: BreadcrumbItem[] = [];
}
