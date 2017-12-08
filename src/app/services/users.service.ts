import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config/config.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Injectable()
export class UsersService {

  @Output()
  logged: EventEmitter<any> = new EventEmitter();
  admin: EventEmitter<any> = new EventEmitter();
  private server: string;
  private token: boolean;
  private params: any;
  private _admin: boolean;
  public notifyConfig: Object;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private route: Router,
    private notify: SnotifyService
  ) {

    this.notifyConfig = {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    };

    this.server = this.config.getConfig();
    if (localStorage.getItem('user') != null) {
    this.checkToken();
    }
    this.getUserParams().then((data) => {
      this.params = data;
      this._admin = data.admin;
    });

  }

  public isLogged (): boolean {

    return localStorage.getItem('user') != null;

  }

  public isAdmin(): boolean {

        return this.isLogged() && this._admin != null;

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

  private checkToken (): void {
      this.http.post(this.server,
        { request: 'Users.tokenCheck', 'token': JSON.parse(localStorage.getItem('user')).token})
        .subscribe((data: {bool: boolean}) => {
          if (!data.bool) {
            this.logout();
            this.change();
            this.notify.warning('Session expired ,you are disconnected', this.notifyConfig);
            this.route.navigate([`/`]);
          }
        });
  }

  public getUserParams (): Promise<any> {

      return new Promise ((resolve, reject) => {
        if(this.isLogged()){
        this.http.post(this.server, { request: 'Users.getUserParams', 'token': JSON.parse(localStorage.getItem('user')).token})
        .subscribe((data) => {
          resolve (data);
        }, (err) => {
          reject (err);
        });
    } else {
      resolve ({admin: null})
    }
  });

  }


}
