import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChapterDescriptionComponent } from './components/chapter-description/chapter-description.component';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'chapters', component: ChaptersComponent},
  { path: 'chapter/:id', component: ChapterDescriptionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
