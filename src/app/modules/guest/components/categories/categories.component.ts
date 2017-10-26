import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './../../../../services/categories.service';


interface Categorie {
  createdAt: Date;
  id: Number;
  titre: String;
  updatedAt: Date;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  public categories: any[];

  constructor(private service: CategoriesService) { }

  ngOnInit() {
    this.getAll();
  }

  private getAll() {
    this.service.getAll().then((data) => {
      this.categories = data.art;
    }, (err) => {
      console.log(err);
    });
  }

}
