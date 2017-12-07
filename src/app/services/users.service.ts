import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ConfigService } from './config/config.service';

@Injectable()
export class UsersService {

  @Output()
  logged: EventEmitter<any> = new EventEmitter();
  admin: EventEmitter<any> = new EventEmitter();
  private server: string;

  constructor(private http: HttpClient, private cookie: CookieService, private config: ConfigService) {
    this.server = this.config.getConfig();
   }

  public isLogged (): boolean {

    return localStorage.getItem('user') != null;

  }

  public isAdmin(): boolean {

        return this.isLogged() && JSON.parse(localStorage.getItem('user')).admin != null;

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

  public logout (): void {

      localStorage.removeItem('user');

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

}
