import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

//  ------------------
import { CategoriesService } from './../../services/categories.service';
import { PostsService } from './../../services/posts.service';
import { CommentsService } from './../../services/Comments.service';
import { ImagesService } from './../../services/images.service';

//  ------------------
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';


const ROUTES: Routes = [
  {path: ':page', component: HomeComponent},
  {path : '', redirectTo: '/1', pathMatch: 'full'}
];

@NgModule({
  imports: [
  CommonModule,
  HttpClientModule,
  RouterModule.forRoot(
    ROUTES
  )
  ],
  declarations: [
    HomeComponent,
    CategoriesComponent
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
