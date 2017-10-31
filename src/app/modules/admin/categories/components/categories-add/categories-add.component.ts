import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SnotifyService } from 'ng-snotify';
import { CategoriesService } from './../../../../../services/categories.service';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.css']
})
export class CategoriesAddComponent implements OnInit {

  public titre: String;
  private notifyConfig: Object;

  constructor(
    private Service: CategoriesService,
    private titleService: Title,
    private notify: SnotifyService
  ) {
    this.setTitle('categories');
    this.notifyConfig = {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    };
   }

  ngOnInit() {
    this.setTitle('New categorie');
  }

  public setTitle( newTitle: string): void {
      this.titleService.setTitle( newTitle );
  }

  public create (): void {
    this.Service.insert(this.titre).then ((data) => {
      this.titre = '';
      this.notify.success('Categorie successfully created', this.notifyConfig);
    });
  }

}
