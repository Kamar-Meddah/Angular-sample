import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Constants from '../config/Constants';

@Injectable()
export class ImagesService {

  constructor(private http: HttpClient) {
  }

  public find(id: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.get(`${Constants.SERVER}?request=Images.find&id=${id}`)
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  public delete(id: Number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.SERVER, {request: 'Images.delete', id: id})
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
}
