//   ------------- Modules -------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';

//   ------------- Services -------------
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from './../../services/users.service';
import { AuthGuard } from './../../guards/auth.guard';
import { UserGuard } from './../../guards/user.guard';

//   ------------- Components -------------
import { HomeComponent } from './components/home/home.component';
import { UsernameEditComponent } from './components/username-edit/username-edit.component';
import { PasswordEditComponent } from './components/password-edit/password-edit.component';

//   ------------- Routes ------------
const ROUTES: Routes = [
  {path: 'admin', canActivate: [UserGuard],
  children: [
    {path: 'home', component: HomeComponent},
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
    SnotifyModule,
    CategoriesModule,
    PostsModule
  ],
  declarations: [
                HomeComponent,
                UsernameEditComponent,
                PasswordEditComponent
                ],
  providers: [
    AuthGuard,
    UserGuard,
    UsersService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    CookieService
  ],
  exports: [
    RouterModule
  ]
})

export class AdminModule { }
