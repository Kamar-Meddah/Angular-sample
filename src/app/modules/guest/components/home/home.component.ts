import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PostsService } from './../../../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from './../../../../interfaces/post';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public page: number;
  public nbpage: number;
  public posts: Array<Post>;
  public loading: Boolean;
  public disabled: Boolean;
  public pages: Array<number>;
  private url: String;
  private loop: Boolean;

    constructor(
                private titleService: Title,
                private service: PostsService,
                private route: ActivatedRoute
              ) {
                this.setTitle('Home');
                this.loop = false;
                this.pages = [];
                this.loading = true;
                this.getPage();
              }

     public setTitle( newTitle: string): void {
      this.titleService.setTitle( newTitle );
    }

    ngOnInit() {
      this.route.params.subscribe((params) => {
        if ( this.url !== params.page ) {
          this.getPage();
          this.url = params.page;
      this.getAll().then((data) => {
        if (this.loop === false) {
        for (let i = 1; i <= data.nbpage; i++) {
          this.pages.push(i);
        }
        this.loop = true;
      }
        this.posts = data.art;
        this.loading = false;
        this.disabled = this.page < data.nbpage ? false : true;
      });
    }
    });
    }

    private getPage (): void {

      this.route.params.subscribe((params) => {
        this.page = isNaN(params.page) || params.page <= 0 ? 1 : Math.ceil(params.page);
      });

    }

    private getAll (): Promise<any> {
      return new Promise((resolve, reject) => {
        this.service.getAllPage(this.page).then((data) => {
          resolve (data);
        }, (err) => {
          reject(err);
        });
      });

    }

}
