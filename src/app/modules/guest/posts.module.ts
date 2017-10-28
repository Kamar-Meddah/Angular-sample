import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { TimeSinceModule } from '@thisissoon/angular-timesince';
import { FormsModule } from '@angular/forms';


//  -----------------
import { CategoriesService } from './../../services/categories.service';
import { PostsService } from './../../services/posts.service';
import { CommentsService } from './../../services/Comments.service';
import { ImagesService } from './../../services/images.service';

//  ------------------
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SearchComponent } from './components/search/search.component';
import { PostCategorieComponent } from './components/post-categorie/post-categorie.component';
import { PostShowComponent } from './components/post-show/post-show.component';


const ROUTES: Routes = [
  {path: ':page', component: HomeComponent},
  {path: 'search/:post/:page', component: SearchComponent},
  {path: ':categorie/:category_id/:page', component: PostCategorieComponent},
  {path: ':categorie/:category_id/:post/:postId', component: PostShowComponent},
  {path : '', redirectTo: '/1', pathMatch: 'full'}
];

@NgModule({
  imports: [
  CommonModule,
  HttpClientModule,
  RouterModule.forRoot(
    ROUTES
  ),
  TimeSinceModule,
  BrowserAnimationsModule,
  FormsModule
  ],
  declarations: [
    HomeComponent,
    CategoriesComponent,
    SearchComponent,
    PostCategorieComponent,
    PostShowComponent
  ],
  providers: [
    CategoriesService,
    PostsService,
    ImagesService,
    CommentsService
  ],
  exports: [
    RouterModule
  ]
})
export class PostsModule { }
