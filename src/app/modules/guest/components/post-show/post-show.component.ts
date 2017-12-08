import { Component, OnInit } from '@angular/core';
import { CommentsService } from './../../../../services/comments.service';
import { Post } from './../../../../interfaces/post';
import { ImagesService } from './../../../../services/images.service';
import { UsersService } from './../../../../services/users.service';
import { PostsService } from './../../../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Categorie } from './../../../../interfaces/categorie';
import { Image } from './../../../../interfaces/image';
import {SnotifyService} from 'ng-snotify';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit {


  public post: any;
  public images: Array<Object>;
  public comments: Array<Object>;
  public loading: Boolean;
  public categorie: String;
  public categorieId: Number;
  public postId: Number;
  public name: String;
  public comment: String;
  public logged: Boolean;
  public isAdmin: Boolean;
  public order: String;
  private username: String;

  private notifyConfig: Object;
  // ---
  public title = 'Delete confirm';
  public message = 'delete selected comment ?';
  public confirmClicked = false;
  public cancelClicked = false;


  constructor(
              private Comments: CommentsService,
              private Images: ImagesService,
              private Users: UsersService,
              private Posts: PostsService,
              private router: ActivatedRoute,
              private notify: SnotifyService,
              private titleService: Title

            ) {
              this.loading = true;
              this.post = {category: {}};
              this.images = [];
              this.comments = [];
              this.logged = this.Users.isLogged();
              this.isAdmin = this.Users.isAdmin();
              this.notifyConfig = {
                timeout: 5000,
                showProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
              };

              this.Users.getUserParams().then((data) => {
                this.username = data.username;
              });
             }

  ngOnInit() {

    this.getParams();
    this.getPost().then((postData) => {
      this.setTitle(`${postData.titre}`);
      this.loading = false;
      this.post = postData;
      this.getImages().then((imagesData) => {
        this.images = imagesData;
        this.getComments().then((commentsData) => {
          this.comments = commentsData;
        }, (err) => {
          console.log(err); // log errors
        });
      }, (err) => {
        console.log (err); // log errors
      });
    }, (err) => {
      console.log(err); // log errors
    });
    //

  }

  private getPost (): Promise<Post> {

    return new Promise ((resolve, reject) => {
      this.Posts.find(this.postId).then((data) => {
        resolve (data);
      }, (err) => {
        reject (err);
      });
    });

  }

  private getParams (): void {

    this.router.params.subscribe((params) => {
      this.categorie = params.categorie;
      this.categorieId = params.category_id;
      this.postId = params.postId;
    });

  }

  private getImages (): Promise<Array<Image>> {

    return new Promise((resolve, reject) => {
    this.Images.find(this.postId).then((data) => {
      resolve(data);
    }, (err) => {
      reject (err);
    });
  });

  }

  private getComments (): Promise<Array<Comment>> {

        return new Promise((resolve, reject) => {
        this.Comments.find(this.postId).then((data) => {
          resolve(data);
        }, (err) => {
          reject (err);
        });
      });

  }

  public commenter (): void {

    this.Comments.commenter(this.postId, this.username, this.comment).then((data) => {
      this.notify.success('Comment Successfully posted', this.notifyConfig);
      this.comments.push({'id': data.id, 'name': this.username, 'content': this.comment, 'date': Date.now() });
      this.name = '';
      this.comment = '';
    }, (err) => {
      console.log(err) ;
    });

  }

  public delete(id: Number, index: number) {

    this.Comments.delete(id).then((data) => {
      this.notify.success('Comment Successfully deleted', this.notifyConfig);
      this.comments.splice(index, 1);
    }, (err) => {
      console.log(err);
    });

  }

  private setTitle( newTitle: string): void {

    this.titleService.setTitle( newTitle );

  }

}
