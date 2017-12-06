import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UsersService {

  @Output()
  logged: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private cookie: CookieService) { }

  public isLogged (): Boolean {

    return this.cookie.check('id');

  }

  public checkPass (id: Number, password: String): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post('http://localhost/', { request: 'Users.passwordCheck', 'password': password, 'id': id })
      .subscribe((data) => {
        resolve (data);
      }, (err) => {
        reject (err);
      });
    });

  }

  public login (username: String, passsword: String): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post('http://localhost/', { request: 'Users.login', username: username, password: passsword })
      .subscribe((data) => {
        resolve (data);
      }, (err) => {
        reject (err);
      });
    });

  }

  public logout (): void {

      this.cookie.delete('id');

  }

  public changeUsername (id: Number, username: String): void {

      this.http.post('http://localhost/', { request: 'Users.usernameChange', 'id': id, 'username': username})
      .subscribe((data) => {
      }, (err) => {
        console.log(err);
      });

  }

  public changePass (id: Number, password: String): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post('http://localhost/', { request: 'Users.passwordChange', 'id': id, 'password': password })
      .subscribe((data) => {
        console.log(data)
        resolve (data);
      }, (err) => {
        reject (err);
      });
    });

  }

  public getEmitedValue (): any {
    return this.logged;
  }

  public change (): any {
    this.logged.emit(this.isLogged ());
  }

}
