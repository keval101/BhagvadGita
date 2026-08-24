import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChapterDescriptionComponent } from './components/chapter-description/chapter-description.component';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { HomeComponent } from './components/home/home.component';
import { VerseDescriptionComponent } from './components/verse-description/verse-description.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'chapters', component: ChaptersComponent },
  { path: 'chapter/:chapId', component: ChapterDescriptionComponent },
  { path: 'chapter/:chapId/verse/:verseId', component: VerseDescriptionComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
