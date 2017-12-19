// ------------------ Modules ------------------
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {PostsModule} from './modules/guest/posts.module';
//  ----------------- Components ---------------
import {AppComponent} from './app.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';

//  --------------- Services -------------------
import {UsersService} from './services/users.service';
import { UserGuard } from './guards/user.guard';
import {NotFoundComponent} from "./components/not-found/not-found.component";

//  -----------------
const ROUTES: Routes = [
  {path: 'admin', canActivate: [UserGuard], loadChildren: './modules/admin/admin.module#AdminModule'},
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFoundComponent
  ],
  imports: [
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    PostsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SnotifyModule
  ],
  providers: [
    UsersService,
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
