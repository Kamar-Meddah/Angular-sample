import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CommentsService {

  constructor(private Http: HttpClient) { }

  public find (id: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.Http.post('http://localhost/', { request: 'Comments.find', id: id })
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });

  }

  public commenter (id: Number, name: String, comment: String): Promise<any> {

    return new Promise((resolve, reject) => {
      this.Http.post('http://localhost/',  { request: 'Comments.add', postId: id, name: name, comment: comment })
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject (err);
      });
    });

  }

  public delete (id: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.Http.post('http://localhost/', { request: 'Comments.delete', id: id, })
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });

  }

}
