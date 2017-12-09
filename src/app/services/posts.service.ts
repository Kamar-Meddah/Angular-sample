import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config/config.service';

@Injectable()
export class PostsService {

  private server: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.server = this.config.getConfig() ;
   }

    public find(id: Number): Promise<any> {

      return new Promise((resolve, reject) => {
        this.http.get(`${this.server}?request=Articles.show&id=${id}`)
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      });

    }

    public getAllPage (page: Number): Promise<any> {

      return new Promise ((resolve, reject) => {
        this.http.get(`${this.server}?request=Articles.index&page=${page}`)
        .subscribe((data: Object) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      });

    }

    public delete(id: Number): Promise<any> {

      return new Promise((resolve, reject) => {
        this.http.post(this.server, { request: 'Articles.delete', id: id })
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          console.log(err);
        });
      });

    }

    public insert (form: any): Promise<any> {

      return new Promise ((resolve, reject) => {
        this.http.post(this.server, form)
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          console.log(err);
        });
      });

    }

    public edit (form: any): Promise<any> {

      return new Promise ((resolve, reject) => {
        this.http.post(this.server, form)
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          console.log(err);
        });
      });

    }

    public getAllFromCategorie (id: Number, page: Number): Promise<any> {

      return new Promise((resolve, reject) => {
        this.http.get(`${this.server}?request=Articles.byCategorie&category_id=${id}&page=${page}`)
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      });

    }

  public search (request: String, page: Number) {

      return new Promise((resolve, reject) => {
        this.http.get(`${this.server}?request=Articles.search&search=${request}&page=${page}`)
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      });

  }

}
