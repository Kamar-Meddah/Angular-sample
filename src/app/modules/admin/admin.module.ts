//   ------------- Modules -------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';

//   ------------- Services -------------
import { UsersService } from '../../services/users.service';

//   ------------- Components -------------
import { HomeComponent } from './components/home/home.component';
import { UsernameEditComponent } from './components/username-edit/username-edit.component';
import { PasswordEditComponent } from './components/password-edit/password-edit.component';

//   ------------- Routes ------------
const ROUTES: Routes = [
  {path: '',
  children: [
    {path: 'home', component: HomeComponent},
    {path: 'edit',
     children: [
       {path: 'user',
          children: [
            {path: 'settings',
            children: [
              {path: 'username', component: UsernameEditComponent},
              {path: 'password', component: PasswordEditComponent}
            ]}
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
    RouterModule.forChild(ROUTES),
    HttpClientModule,
    FormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CategoriesModule,
    PostsModule
  ],
  declarations: [
                HomeComponent,
                UsernameEditComponent,
                PasswordEditComponent
                ],
  providers: [
    UsersService,
  ],
  exports: [
    RouterModule
  ]
})

export class AdminModule { }
