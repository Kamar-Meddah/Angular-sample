import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from './../../services/users.service';
import { AuthGuard } from './../../services/auth.guard';
import { UsernameEditComponent } from './components/username-edit/username-edit.component';
import { PasswordEditComponent } from './components/password-edit/password-edit.component';
import { PostsService } from './../../services/posts.service';
import { ImagesService } from './../../services/images.service';
import { CommentsService } from './../../services/comments.service';
import { CategoriesService } from './../../services/categories.service';
import { MatInputModule, MatButtonModule, MatSelectModule, MatCardModule } from '@angular/material';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { OrderModule } from 'ngx-order-pipe';



const ROUTES: Routes = [
  {path: 'admin', canActivate: [AuthGuard],
  children: [
    {path: 'home', component: HomeComponent },
    {path: 'edit',
     children: [
       {path: 'username', component: UsernameEditComponent},
       {path: 'password', component: PasswordEditComponent}
     ]
    }
  ]
}
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
    SnotifyModule,
    BrowserAnimationsModule,
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
                UsernameEditComponent,
                PasswordEditComponent
                ],
  providers: [
    AuthGuard,
    CategoriesService,
    PostsService,
    ImagesService,
    UsersService,
    CommentsService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    CookieService
  ]
})
export class AdminModule { }
