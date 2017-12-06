import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config/config.service';

@Injectable()
export class ImagesService {

  private server: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.server = this.config.getConfig();
   }

  public find (id: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.server, { request: 'Images.find', id: id })
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });

  }

  public delete (id: Number): Promise<any> {

    return new Promise ((resolve, reject) => {
      this.http.post(this.server, { request: 'Images.delete', id: id })
      .subscribe((data) => {
        resolve(data);
    }, (err) => {
      reject(err);
    });
    });

  }

}
