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
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';

//   ------------- Services -------------
import { AuthGuard } from './../../../services/auth.guard';
import { CategoriesService } from './../../../services/categories.service';

//   ------------- Components -------------
import { CategoriesHomeComponent } from './components/categories-home/categories-home.component';
import { CategoriesEditComponent } from './components/categories-edit/categories-edit.component';
import { CategoriesAddComponent } from './components/categories-add/categories-add.component';

//   ------------- Routes ------------
const ROUTES: Routes = [
  {path: 'admin', canActivate: [AuthGuard],
  children: [
    {path: 'edit',
     children: [
       {path: 'categories',
      children: [
        {path: 'add', component: CategoriesAddComponent},
        {path: 'home/:page', component: CategoriesHomeComponent},
        {path: ':title/:id', component: CategoriesEditComponent}

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
    CategoriesHomeComponent,
    CategoriesEditComponent,
    CategoriesAddComponent
  ],
  providers: [
    AuthGuard,
    CategoriesService
  ]
})
export class CategoriesModule { }
