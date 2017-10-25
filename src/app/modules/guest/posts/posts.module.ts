import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//  ------------------
import { CategoriesService } from './../../../services/categories.service';
import { PostsService } from './../../../services/posts.service';
//  ------------------
import { HomeComponent } from '../components/home/home.component';
import { CategoriesComponent } from '../components/categories/categories.component';


const routes: Routes = [
  {path : '', redirectTo: '/1'},
  {path: ':page', component: HomeComponent}
]

@NgModule({
  imports: [
  CommonModule,
  RouterModule
  ],
  declarations: [
    HomeComponent,
    CategoriesComponent
  ],
  providers: [
    CategoriesService,
    PostsService
  ]
})
export class PostsModule { }
