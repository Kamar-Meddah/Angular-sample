import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Constants from '../config/Constants';

@Injectable()
export class ImagesService {

  constructor(private http: HttpClient) {
  }

  public find(id: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.get(`${Constants.SERVER}Images/find?id=${id}`)
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
          reject(err);
      });
    });

  }

  public delete(id: Number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(Constants.SERVER + `Images/delete?id=${id}`)
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
          reject(err);
      });
    });
  }
}
