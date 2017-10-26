import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PostsModule } from './modules/guest/posts.module';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material';

//  -----------------
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

//  ---------------
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
  MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
