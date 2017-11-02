//   ------------- Modules -------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { MatInputModule, MatButtonModule, MatCardModule, MatSelectModule } from '@angular/material';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';

//   ------------- Services -------------
import { AuthGuard } from './../../../services/auth.guard';
import { PostsService } from './../../../services/posts.service';
import { ImagesService } from './../../../services/images.service';
import { CategoriesService } from './../../../services/categories.service';

//   ------------- Components -------------
import { PostsHomeComponent } from './components/posts-home/posts-home.component';
import { PostsEditComponent } from './components/posts-edit/posts-edit.component';
import { PostsAddComponent } from './components/posts-add/posts-add.component';

//   ------------- Routes ------------
const ROUTES: Routes = [
  {path: 'admin', canActivate: [AuthGuard],
  children: [
    {path: 'edit',
     children: [
       {path: 'Posts',
      children: [
        {path: 'add', component: PostsAddComponent},
        {path: 'home/:page', component: PostsHomeComponent},
        {path: ':title/:id', component: PostsEditComponent}

      ]
     }
     ]
    }
  ]
}
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(
      ROUTES
    ),
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ConfirmationPopoverModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    SnotifyModule
  ],
  declarations: [
    PostsHomeComponent,
    PostsEditComponent,
    PostsAddComponent
  ],
  providers: [
    AuthGuard,
    PostsService,
    ImagesService,
    CategoriesService
  ],
  exports: [RouterModule]
})
export class PostsModule { }
