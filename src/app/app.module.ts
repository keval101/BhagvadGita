import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { APIinterceptorService } from './services/apiinterceptor.service';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChapterDescriptionComponent } from './components/chapter-description/chapter-description.component'
import { FooterComponent } from './components/footer/footer.component';
import { VerseDescriptionComponent } from './components/verse-description/verse-description.component';
import { LoginComponent } from './components/login/login.component';

//pagination-library
import { NgxPaginationModule } from 'ngx-pagination';

//primeng
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChaptersComponent,
    NavbarComponent,
    ChapterDescriptionComponent,
    VerseDescriptionComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProgressSpinnerModule,
    NgxPaginationModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
