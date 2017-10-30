import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SnotifyModule } from 'ng-snotify';
import { CookieService } from 'ngx-cookie-service';

const ROUTES: Routes = [
  {path: 'admin/home', component: HomeComponent}
];



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(
    ROUTES
    ),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SnotifyModule
  ],
  declarations: [HomeComponent]
})
export class AdminModule { }
