import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PostsService } from './../../../../services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private page: Number;
  private nbpage: Number;
  private posts: Object;
  private loading: Boolean;
  private disabled: Boolean;
  private pages: Array<Number>;
  private url: String;
  private query: String;
  private currentPage: String;
  private loop: Boolean;

    public constructor(private titleService: Title, private service: PostsService, private route: ActivatedRoute) {

      this.loop = true;
      this.pages = [];
      this.getPage();
     }

    private setTitle( newTitle: string): void {
      this.titleService.setTitle( newTitle );
    }

    ngOnInit() {

      this.route.url.subscribe((url) => {
        this.query = url[1].path;
        this.setTitle(`Search: ${this.query}`);
        if ( this.url !== url[1].path || this.currentPage !== url[2].path ) {
          this.loading = true;
          this.getPage();
          this.getAll().then((data) => {
            if (this.url !== url[1].path) {
              this.pages = [];
              this.loop = true;
            }
          if (this.loop) {
            for (let i = 1; i <= data.nbpage; i++) {
              this.pages.push(i);
            }
          }
          if (this.url !== url[2].path) {
            this.loop = false;
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
        this.route.params.subscribe((params) => {
          this.service.search(params.post, this.page).then((data) => {
            resolve (data);
          }, (err) => {
            reject(err);
          });
        });

      });

    }

}
