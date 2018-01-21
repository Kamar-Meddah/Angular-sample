import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import Constants from '../config/Constants';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class UsersService {

  logged: EventEmitter<any> = new EventEmitter();
  admin: EventEmitter<any> = new EventEmitter();
  private server: string;
  public token: string;

  constructor(
    private http: HttpClient,
    private route: Router,
    private notify: ToastrService
  ) {}

  public isLogged (): boolean {
    return localStorage.getItem('token') != null;
  }

  public isAdmin(): boolean {
    if (this.isLogged) {
      return this.isLogged() && jwtDecode(localStorage.getItem('token')).admin ;
    } else {
      return false;
    }
  }

  public checkPass (id: Number, password: String): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post(Constants.SERVER + 'Users/passwordCheck', { 'password': password, 'id': id })
      .toPromise().then((data) => {
        resolve (data);
      }).catch((err) => {
        reject (err);
      });
    });

  }

  public login (email: String, passsword: String): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post(Constants.SERVER + 'Users/login', {email: email, password: passsword })
      .toPromise().then((data) => {
        resolve (data);
      }).catch((err) => {
        reject (err);
      });
    });

  }

  public register (email: String, passsword: String, username: String): Promise<any> {

        return new Promise ((resolve, reject) => {
          this.http.post(Constants.SERVER + 'Users/register', { email: email, password: passsword, username: username })
          .toPromise().then((data) => {
            resolve (data);
          }).catch((err) => {
            reject (err);
          });
        });

  }

  public logout (): void {
      localStorage.removeItem('token');
  }

  public changeUsername (id: Number, username: String): void {

      this.http.put(Constants.SERVER +  'Users/usernameChange', { 'id': id, 'username': username})
      .toPromise().catch((err) => {
        console.log(err);
      });

  }

  public changePass (id: Number, password: String): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.put(Constants.SERVER + 'Users/passwordChange', { 'id': id, 'password': password })
      .toPromise().then((data) => {
        resolve (data);
      }).catch((err) => {
        reject (err);
      });
    });
  }

  public getEmitedValue (): any {
    return this.logged;
  }

  public getIsAdmin (): any {
    return this.admin;
  }

  public change (): void {
    this.logged.emit(this.isLogged());
    this.admin.emit(this.isAdmin());
  }

  public checkToken (): Promise <any>  {
    return new Promise ((resolve, reject) => {
      this.http.post(Constants.SERVER + 'Users/tokenCheck', { 'token': this.token})
      .toPromise().then((data: {bool: boolean}) => {
        resolve (data.bool);
      }).catch(err => {
        reject (err);
      });
    });
  }
}
