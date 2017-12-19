import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './../../../../../services/categories.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Categorie } from './../../../../../interfaces/categorie';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.css']
})
export class CategoriesHomeComponent implements OnInit {

  public page: number;
  public nbpage: number;
  public categories: Array<Categorie>;
  public loading: Boolean;
  public disabled: Boolean;
  public pages: Array<number>;
  private url: String;
  private loop: Boolean;

  // ---
  public title = 'Delete confirm';
  public message = 'delete selected comment ?';


  constructor(
    private Service: CategoriesService,
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
      this.categories = data.art;
      this.loading = false;
      this.disabled = this.page < data.nbpage ? false : true;
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
      if (data.num === 0) {
        this.notify.success('Categorie succesfully deleted');
        this.categories[index] = {
          deleted : true,
          id: null,
          titre: 'This Content no longer Exist'
        };
      } else {
        this.notify.error('Can not delete, This categorie is not empty !!');
      }
    });

  }

}
