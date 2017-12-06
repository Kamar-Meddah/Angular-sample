import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsersService } from './users.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

  private admin: any = false;

  constructor (private Users: UsersService, private route: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.admin = this.Users.isAdmin();
      if (!this.admin) {
        this.route.navigate(['']);
      }
      return this.admin;
  }
}
