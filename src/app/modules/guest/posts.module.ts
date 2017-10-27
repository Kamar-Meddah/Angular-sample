import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { TimeSinceModule } from '@thisissoon/angular-timesince';

import {MatPaginatorModule} from '@angular/material';

//  -----------------
import { CategoriesService } from './../../services/categories.service';
import { PostsService } from './../../services/posts.service';
import { CommentsService } from './../../services/Comments.service';
import { ImagesService } from './../../services/images.service';

//  ------------------
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ContentPreviewPipe } from './pipes/content-preview.pipe';


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
  ),
  TimeSinceModule,
  BrowserAnimationsModule,
  MatPaginatorModule
  ],
  declarations: [
    HomeComponent,
    CategoriesComponent,
    ContentPreviewPipe
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
