//   ------------- Modules -------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';

//   ------------- Services -------------
import { CategoriesService } from '../../../services/categories.service';

//   ------------- Components -------------
import { CategoriesHomeComponent } from './components/categories-home/categories-home.component';
import { CategoriesEditComponent } from './components/categories-edit/categories-edit.component';
import { CategoriesAddComponent } from './components/categories-add/categories-add.component';

//   ------------- Routes ------------
const ROUTES: Routes = [
  {path: '',
  children: [
    {path: 'edit',
     children: [
       {path: 'categories',
      children: [
        {path: 'content',
        children: [
          {path: 'add', component: CategoriesAddComponent},
          {path: 'home/:page', component: CategoriesHomeComponent},
          {path: ':title/:id', component: CategoriesEditComponent}
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
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ConfirmationPopoverModule,
    ConfirmationPopoverModule.forRoot({confirmButtonType: 'danger'})
  ],
  declarations: [
    CategoriesHomeComponent,
    CategoriesEditComponent,
    CategoriesAddComponent
  ],
  providers: [
    CategoriesService
  ]
})
export class CategoriesModule { }
