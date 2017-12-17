//   ------------- Modules -------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { TimeSinceModule } from '@thisissoon/angular-timesince';
import { FormsModule } from '@angular/forms';
import {MatInputModule, MatButtonModule, MatCardModule, MatSelectModule} from '@angular/material';
import { OrderModule } from 'ngx-order-pipe';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

//   ------------- Services -------------
import { CategoriesService } from './../../services/categories.service';
import { PostsService } from './../../services/posts.service';
import { CommentsService } from './../../services/comments.service';
import { ImagesService } from './../../services/images.service';
import { UsersService } from './../../services/users.service';

//   ------------- Components -------------
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SearchComponent } from './components/search/search.component';
import { PostCategorieComponent } from './components/post-categorie/post-categorie.component';
import { PostShowComponent } from './components/post-show/post-show.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

//   ------------- Routes ------------
const ROUTES: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
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
  RouterModule.forChild(
    ROUTES
  ),
  TimeSinceModule,
  FormsModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule,
  OrderModule,
  ConfirmationPopoverModule,
  ConfirmationPopoverModule.forRoot({
    confirmButtonType: 'danger' // set defaults here
  }),
  SnotifyModule
  ],
  declarations: [
    HomeComponent,
    CategoriesComponent,
    SearchComponent,
    PostCategorieComponent,
    PostShowComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    CategoriesService,
    PostsService,
    ImagesService,
    UsersService,
    CommentsService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  exports: [
    RouterModule
  ]
})

export class PostsModule { }
