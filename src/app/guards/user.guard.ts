import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable()
export class UserGuard implements CanActivate {

  private logged: boolean;

  constructor (private Users: UsersService, private route: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      this.logged = this.Users.isLogged();
      if (!this.logged) {
        this.route.navigate(['']);
      }
      return this.logged;
  }
  }
