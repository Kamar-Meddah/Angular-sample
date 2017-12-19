import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../../../services/posts.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../../../interfaces/post';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-posts-home',
  templateUrl: './posts-home.component.html',
  styleUrls: ['./posts-home.component.css']
})
export class PostsHomeComponent implements OnInit {

  public page: number;
  public nbpage: number;
  public posts: Array<Post>;
  public loading: Boolean;
  public disabled: Boolean;
  public pages: Array<number>;
  private url: String;
  private loop: Boolean;

  public title = 'Delete confirm';
  public message = 'delete selected Element ?';

  constructor(
    private Service: PostsService,
    private titleService: Title,
    private route: ActivatedRoute,
    private notify: ToastrService
  ) {
    this.setTitle('categories');
    this.loop = false;
    this.pages = [];
    this.loading = true;
    this.getPage();
  }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      if ( this.url !== params.page ) {
        this.getPage();
        this.url = params.page;
    this.getAll().then((data) => {
      this.pages = [];
      for (let i = 1; i <= data.nbpage; i++) {
        this.pages.push(i);
    }
      this.posts = data.art;
      this.loading = false;
      this.disabled = this.page >= data.nbpage;
    });
  }
  });

  }

  public setTitle( newTitle: string): void {

    this.titleService.setTitle( newTitle );

  }

  private getPage (): void {

    this.route.params.subscribe((params) => {
      this.page = isNaN(params.page) || params.page <= 0 ? 1 : Math.ceil(params.page);
    });

  }

  private getAll (): Promise<any> {

      return new Promise((resolve, reject) => {
        this.Service.getAllPage(this.page).then((data) => {
          resolve (data);
        }, (err) => {
          reject(err);
        });
      });

  }

  public delete (id: number, index: number): void {

    this.Service.delete(id).then((data) => {
        this.notify.success('Post succesfully deleted');
        this.posts[index] = {
          titre: 'no longer Exist',
          deleted : true,
          id: null,
          category: {
            id: null,
            titre: 'This Content'
        }
      };
    });

  }

}
