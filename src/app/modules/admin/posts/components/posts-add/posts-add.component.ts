import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './../../../../../services/categories.service';
import { Title } from '@angular/platform-browser';
import { SnotifyService } from 'ng-snotify';
import { Categorie } from './../../../../../interfaces/categorie';
import { ImagesService } from './../../../../../services/images.service';
import { Image } from './../../../../../interfaces/image';

@Component({
  selector: 'app-posts-add',
  templateUrl: './posts-add.component.html',
  styleUrls: ['./posts-add.component.css']
})
export class PostsAddComponent implements OnInit {

  public titre: String;
  public contenu: String;
  public categories: Array<Categorie>;
  public images: Array<Image>;
  private notifyConfig: Object;

  constructor(
    private Categories: CategoriesService,
    private Images: ImagesService,
    private titleService: Title,
    private notify: SnotifyService
  ) {
     this.notifyConfig = {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    };
   }

  ngOnInit() {
    this.setTitle('New Post');
  }

  private setTitle( newTitle: string): void {
      this.titleService.setTitle( newTitle );
  }

  public create (): void {
    /*
    this.Service.insert(this.titre).then ((data) => {
      this.titre = '';
      this.notify.success('Categorie successfully created', this.notifyConfig);
    });*/
  }

}
