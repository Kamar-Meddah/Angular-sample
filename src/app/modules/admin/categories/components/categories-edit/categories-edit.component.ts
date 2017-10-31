import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './../../../../../services/categories.service';
import { Title } from '@angular/platform-browser';
import { SnotifyService } from 'ng-snotify';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {


  public titre: String;
  private notifyConfig: Object;
  private id: number;

  constructor(
    private Service: CategoriesService,
    private titleService: Title,
    private notify: SnotifyService,
    private router: ActivatedRoute
  ) {
    this.notifyConfig = {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    };
    this.router.params.subscribe((params) => {
      this.titre = params.title;
    });
   }

  ngOnInit() {
    this.setTitle('Edit categorie');
    this.getId();
  }

  public setTitle( newTitle: string): void {
      this.titleService.setTitle( newTitle );
  }

  public update (): void {
    this.Service.edit(this.titre, this.id).then ((data) => {
      this.titre = '';
      this.notify.success('Categorie successfully upated', this.notifyConfig);
    });
  }

  private getId (): void {
    this.router.params.subscribe((params) => {
      this.id = params.id;
    });
  }


}
