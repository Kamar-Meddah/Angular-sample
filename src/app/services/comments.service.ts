import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config/config.service';


@Injectable()
export class CommentsService {

  private server: string;

  constructor(private Http: HttpClient, private config: ConfigService) {
    this.server = this.config.getConfig();
   }

  public find (id: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.Http.post(this.server, { request: 'Comments.find', id: id })
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });

  }

  public commenter (id: Number, name: String, comment: String): Promise<any> {

    return new Promise((resolve, reject) => {
      this.Http.post(this.server,  { request: 'Comments.add', postId: id, name: name, comment: comment })
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject (err);
      });
    });

  }

  public delete (id: Number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.Http.post(this.server, { request: 'Comments.delete', id: id})
      .subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });

  }

}
