import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  public isLogged (): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post('http://localhost/', {request: 'Users.logged' })
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });

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

  public logout (): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post('http://localhost/', { request: 'Users.logout' })
      .subscribe((data) => {
        resolve (data);
      }, (err) => {
        reject (err);
      });
    });

  }

  public changeUsername (id: Number, username: String): Promise<any> {

    return new Promise ((reject, resolve) => {
      this.http.post('http://localhost/', { request: 'Users.usernameChange', 'id': id, 'username': username})
      .subscribe((data) => {
        resolve (data);
      }, (err) => {
        reject (err);
      });
    });

  }

  public changePass (id: Number, password: String): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post('http://localhost/', { request: 'Users.passwordChange', 'id': id, 'password': password })
      .subscribe((data) => {
        resolve (data);
      }, (err) => {
        reject (err);
      });
    });

  }

  public getUserId (): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post('http://localhost/', { request: 'Users.getUserId' })
      .subscribe((data) => {
        resolve (data);
      }, (err) => {
        reject (err);
      });
    });

  }

}
