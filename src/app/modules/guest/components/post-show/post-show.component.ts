import { Component, OnInit } from '@angular/core';
import { CommentsService } from './../../../../services/comments.service';
import { Post } from './../../../../interfaces/post';
import { ImagesService } from './../../../../services/images.service';
import { UsersService } from './../../../../services/users.service';
import { PostsService } from './../../../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Categorie } from './../../../../interfaces/categorie';
import { Image } from './../../../../interfaces/image';


@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit {


  private post: Object;
  private images: Array<Object>;
  private comments: Array<Object>;
  private loading: Boolean;
  private categorie: String;
  private categorieId: Number;
  private postId: Number;
  private name: String;
  private comment: String;

  // ---
  public title = 'Popover title';
  public message = 'Popover description';
  public confirmClicked = false;
  public cancelClicked = false;


  constructor(
              private Comments: CommentsService,
              private Images: ImagesService,
              private Users: UsersService,
              private Posts: PostsService,
              private router: ActivatedRoute
            ) {
              this.loading = true;
              this.post = {category: {}};
              this.images = [];
              this.comments = [];
             }
 
  ngOnInit() {

    this.getParams();
    this.getPost().then((postData) => {
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

  private commenter (): void {

    this.Comments.commenter(this.postId, this.name, this.comment).then((data) => {
      this.comments.push({'id': data.id, 'name': this.name, 'content': this.comment, 'date': Date.now() });
      this.name = '';
      this.comment = '';
    }, (err) => {
      console.log(err) ;
    });

  }

}
