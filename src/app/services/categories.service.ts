import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Constants from '../config/Constants';

@Injectable()
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.get(`${Constants.SERVER}Categories/all`)
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
        reject(err);
      });
    });

  }

  public getAllPage(page: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.get(`${Constants.SERVER}Categories/index?page=${page}`)
        .toPromise().then((data: Object) => {
          resolve(data);
        }).catch((err) => {
          reject (err);
      });
    });
  }

  public delete(id: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.delete(Constants.SERVER + `Categories/delete?id=${id}`)
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
          reject(err);
      });
    });

  }

  public insert(titre: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.SERVER + 'Categories/add', {title: titre})
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
        reject(err);
      });
    });

  }

  public edit(titre: String, id: Number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(Constants.SERVER + 'Categories/edit', {title: titre, id: id})
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
          reject(err);
      });
    });
  }
}
