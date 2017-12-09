import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config/config.service';


@Injectable()
export class CategoriesService {

  private server: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.server = this.config.getConfig();
   }

  public getAll(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.get(`${this.server}?request=Categories.all`)
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });

  }

  public getAllPage (page: Number): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.get(`${this.server}?request=Categories.index&page=${page}`)
      .subscribe((data: Object) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });

  }

  public delete(id: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.server, { request: 'Categories.delete', id: id })
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        console.log(err);
      });
    });

  }

  public insert (titre: String): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post(this.server, { request: 'Categories.add', title: titre })
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        console.log(err);
      });
    });

  }

  public edit (titre: String, id: Number): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post(this.server, { request: 'Categories.edit', title: titre, id: id})
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        console.log(err);
      });
    });

  }

}
