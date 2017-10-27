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

    public constructor(private titleService: Title, private service: PostsService, private route: ActivatedRoute) {
      this.setTitle('Home');
      this.pages = [];
      this.loading = true;
      this.getPage().then((data) => {
        this.page = data;
      });
     }

    private setTitle( newTitle: string): void {
      this.titleService.setTitle( newTitle );
    }

    ngOnInit() {

      this.getAll().then((data) => {
        for (let i = 1; i <= data.nbpage; i++) {
          this.pages.push(i);
        }
        this.posts = data.art;
        this.loading = false;
        this.disabled = this.page < data.nbpage ? false : true;
        console.log(this.pages)
      });

    }

    private getPage (): Promise<Number> {

      return new Promise ((resolve) => {
        this.route.params.subscribe((params) => {
          resolve(isNaN(params.page) || params.page <= 0 ? 1 : Math.ceil(params.page));
        });
      });

    }

    private getAll (): Promise<any> {
      return new Promise((resolve, reject) => {
        this.service.getAllPage(this.page).then((data) => {
          resolve (data);
        }, (err) => {
          reject(err);
        });
      })

    }



}
