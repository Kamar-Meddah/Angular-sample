import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import * as jwtDecode from 'jwt-decode';
import Constants from '../config/Constants';

@Injectable()
export class UsersService {

  logged: EventEmitter<any> = new EventEmitter();
  admin: EventEmitter<any> = new EventEmitter();
  private server: string;
  public token: string;
  public notifyConfig: Object;

  constructor(
    private http: HttpClient,
    private route: Router,
    private notify: SnotifyService
  ) {

    this.notifyConfig = {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    };
    this.server = Constants.SERVER;
    this.token = localStorage.getItem('token');
  }

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
      this.http.post(this.server, { request: 'Users.passwordCheck', 'password': password, 'id': id })
      .subscribe((data) => {
        resolve (data);
      }, (err) => {
        reject (err);
      });
    });

  }

  public login (email: String, passsword: String): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post(this.server, { request: 'Users.login', email: email, password: passsword })
      .subscribe((data) => {
        resolve (data);
      }, (err) => {
        reject (err);
      });
    });

  }

  public register (email: String, passsword: String, username: String): Promise<any> {

        return new Promise ((resolve, reject) => {
          this.http.post(this.server, { request: 'Users.register', email: email, password: passsword, username: username })
          .subscribe((data) => {
            resolve (data);
          }, (err) => {
            reject (err);
          });
        });

  }

  public logout (): void {
      localStorage.removeItem('token');
  }

  public changeUsername (id: Number, username: String): void {

      this.http.post(this.server, { request: 'Users.usernameChange', 'id': id, 'username': username})
      .subscribe((data) => {
      }, (err) => {
        console.log(err);
      });

  }

  public changePass (id: Number, password: String): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post(this.server, { request: 'Users.passwordChange', 'id': id, 'password': password })
      .subscribe((data) => {
        resolve (data);
      }, (err) => {
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

  public change (): any {
    this.logged.emit(this.isLogged());
    this.admin.emit(this.isAdmin());
  }

  private checkToken (): void {
      this.http.post(this.server,
        { request: 'Users.tokenCheck', 'token': this.token})
        .subscribe((data: {bool: boolean}) => {
          if (!data.bool) {
            this.logout();
            this.change();
            this.notify.warning('Session expired ,you are disconnected', this.notifyConfig);
            this.route.navigate([`/`]);
          }
        });
  }
}
