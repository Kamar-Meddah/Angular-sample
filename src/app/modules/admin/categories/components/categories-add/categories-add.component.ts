import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CategoriesService } from '../../../../../services/categories.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.css']
})
export class CategoriesAddComponent implements OnInit {

  public titre: String;


  constructor(
    private Service: CategoriesService,
    private titleService: Title,
    private notify: ToastrService
  ) {}

  ngOnInit() {
    this.setTitle('New categorie');
  }

  public setTitle( newTitle: string): void {
      this.titleService.setTitle( newTitle );
  }

  public create (): void {
    this.Service.insert(this.titre).then ((data) => {
      this.titre = '';
      this.notify.success('Categorie successfully created');
    });
  }

}
