//   ------------- Modules -------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCardModule, MatSelectModule} from '@angular/material';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';


//   ------------- Components -------------
import { PostsHomeComponent } from './components/posts-home/posts-home.component';
import { PostsEditComponent } from './components/posts-edit/posts-edit.component';
import { PostsAddComponent } from './components/posts-add/posts-add.component';

//   ------------- Routes ------------
const ROUTES: Routes = [
  {path: '',
  children: [
    {path: 'edit',
     children: [
       {path: 'posts',
      children: [
        {path: 'content',
        children: [
          {path: 'add', component: PostsAddComponent},
          {path: 'home/:page', component: PostsHomeComponent},
          {path: ':title/:id', component: PostsEditComponent}
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
    RouterModule.forChild(
      ROUTES
    ),
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    ConfirmationPopoverModule,
    ConfirmationPopoverModule.forRoot({confirmButtonType: 'danger'})
  ],
  declarations: [
    PostsHomeComponent,
    PostsEditComponent,
    PostsAddComponent
  ],
  providers: [],
  exports: [RouterModule]
})
export class PostsModule { }
