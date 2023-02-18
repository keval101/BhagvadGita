import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChapterDescriptionComponent } from './components/chapter-description/chapter-description.component';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { HomeComponent } from './components/home/home.component';
import { VerseDescriptionComponent } from './components/verse-description/verse-description.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'chapters', component: ChaptersComponent},
  { path: 'chapter/:chapId', component: ChapterDescriptionComponent},
  { path: 'chapter/:chapId/verse/:verseId', component: VerseDescriptionComponent},
  { path: 'login', component: LoginComponent},
  { path: '404', component: HomeComponent},
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
