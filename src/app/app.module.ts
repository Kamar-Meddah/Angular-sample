import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PostsModule } from './modules/guest/posts/posts.module';
//  -----------------
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserModule,
  PostsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
