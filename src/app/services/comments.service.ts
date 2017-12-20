import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Constants from '../config/Constants';

@Injectable()
export class CommentsService {

  constructor(private Http: HttpClient) {
  }

  public find(id: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.Http.get(`${Constants.SERVER}?request=Comments.find&id=${id}`)
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
        reject(err);
      });
    });

  }

  public commenter(id: Number, name: String, comment: String): Promise<any> {

    return new Promise((resolve, reject) => {
      this.Http.post(Constants.SERVER, {request: 'Comments.add', postId: id, name: name, comment: comment})
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
        reject(err);
      });
    });

  }

  public delete(id: Number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Http.post(Constants.SERVER, {request: 'Comments.delete', id: id})
        .toPromise().then((data) => {
          resolve(data);
        }).catch((err) => {
          reject(err);
      });
    });
  }

}
