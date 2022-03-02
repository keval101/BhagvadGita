import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'chapters', component: ChaptersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
