import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Constants from '../config/Constants';

@Injectable()
export class PostsService {

  private server: string;

  constructor(private http: HttpClient) {}

  public find(id: Number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${Constants.SERVER}Articles/show?id=${id}`)
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
          reject(err);
      });
    });

  }

  public getAllPage(page: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.get(`${Constants.SERVER}Articles/index?page=${page}`)
        .toPromise().then((data: Object) => {
          resolve(data);
        }).catch((err) => {
          reject(err);
      });
    });

  }

  public delete(id: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.delete(Constants.SERVER + `Articles/delete?id=${id}`)
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
        reject(err);
      });
    });

  }

  public insert(form: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(Constants.SERVER + 'Articles/insert', form)
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
        reject(err);
      });
    });

  }

  public edit(form: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(Constants.SERVER + 'Articles/edit', form)
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
        reject(err);
      });
    });

  }

  public getAllFromCategorie(id: Number, page: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.get(`${Constants.SERVER}Articles/byCategorie?category_id=${id}&page=${page}`)
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
          reject (err);
      });
    });

  }

  public search(request: String, page: Number) {

    return new Promise((resolve, reject) => {
      this.http.get(`${Constants.SERVER}Articles/search?search=${request}&page=${page}`)
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
          reject(err);
      });
    });

  }

}
