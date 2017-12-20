// ------------------ Modules ------------------
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

import {CoreServicesModule} from './modules/core-services/core-services.module';
import {PostsModule} from './modules/guest/posts.module';
import { ToastrModule } from 'ngx-toastr';
//  ----------------- Components ---------------
import {AppComponent} from './app.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

//  --------------- Services -------------------
import { UserGuard } from './guards/user.guard';



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
    CoreServicesModule,
    RouterModule.forRoot(ROUTES),
    PostsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right', timeOut: 4000})
  ],
  providers: [

    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
