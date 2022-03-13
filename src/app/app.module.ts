import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { APIinterceptorService } from './services/apiinterceptor.service';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChapterDescriptionComponent } from './components/chapter-description/chapter-description.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChaptersComponent,
    NavbarComponent,
    ChapterDescriptionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: APIinterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
