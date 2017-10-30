// ------------------ Modules ------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { PostsModule } from './modules/guest/posts.module';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { CookieService } from 'ngx-cookie-service';

//  ----------------- Components ---------------
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

//  --------------- Services -------------------
import { UsersService } from './services/users.service';

//  -----------------
const ROUTES: Routes = [
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFoundComponent
  ],
  imports: [
  BrowserModule,
  PostsModule,
  RouterModule.forRoot(
  ROUTES
  ),
  HttpClientModule,
  BrowserAnimationsModule,
  FormsModule,
  SnotifyModule

  ],
  providers: [
    UsersService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
