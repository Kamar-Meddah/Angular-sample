import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoriesService {

  constructor(private http: HttpClient) { }

  public getAll(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post('http://localhost/', { request: 'Categories.all' })
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });

  }

  public getAllPage (page: Number): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post('http://localhost/', { request: 'Categories.index', page: page })
      .subscribe((data: Object) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });

  }

  public delete(id: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post('http://localhost/', { request: 'Categories.delete', id: id })
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        console.log(err);
      });
    });

  }

  public insert (titre: String): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post('http://localhost/', { request: 'Categories.add', title: titre })
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        console.log(err);
      });
    });

  }

  public edit (titre: String, id: Number): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post('http://localhost/', { request: 'Categories.edit', title: titre, id: id})
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        console.log(err);
      });
    });

  }

}
