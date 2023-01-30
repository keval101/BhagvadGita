import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChapterDescriptionComponent } from './components/chapter-description/chapter-description.component';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { HomeComponent } from './components/home/home.component';
import { VerseDescriptionComponent } from './components/verse-description/verse-description.component';
import { LoginComponent } from './components/login/login.component';
import { ChapterDescriptonResolver } from './resolvers/chapter-descripton.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'chapters', component: ChaptersComponent},
  { path: 'chapter/:chapId', resolve: { chapter: ChapterDescriptonResolver }, component: ChapterDescriptionComponent},
  { path: 'chapter/:chapId/verse/:verseId', component: VerseDescriptionComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
