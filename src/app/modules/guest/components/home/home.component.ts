import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PostsService } from './../../../../services/posts.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private page: Number;
  private nbpage: Number;
  private posts: Object;
  private loading: Boolean;
  private disabled: Boolean;
  private pages: Array<Number>;
  private url: String;
  private loop: Number;

    public constructor(private titleService: Title, private service: PostsService, private route: ActivatedRoute) {
      this.setTitle('Home');
      this.loop = 0;
      this.pages = [];
      this.loading = true;
      this.getPage();

     }

    private setTitle( newTitle: string): void {
      this.titleService.setTitle( newTitle );
    }

    ngOnInit() {
      this.route.url.subscribe((url) => {
        if ( this.url !== url[0].path ) {
          this.getPage();
          this.url = url[0].path;
      this.getAll().then((data) => {
        if (this.loop === 0) {
        for (let i = 1; i <= data.nbpage; i++) {
          this.pages.push(i);
        }
        this.loop = 1;
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
