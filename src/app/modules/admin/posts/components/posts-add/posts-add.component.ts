import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';
import { CategoriesService } from './../../../../../services/categories.service';
import { Title } from '@angular/platform-browser';
import { SnotifyService } from 'ng-snotify';
import { Categorie } from './../../../../../interfaces/categorie';
import { Image } from './../../../../../interfaces/image';
import { PostsService } from './../../../../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-add',
  templateUrl: './posts-add.component.html',
  styleUrls: ['./posts-add.component.css']
})
export class PostsAddComponent implements OnInit {

  @ViewChild('inputFile') nativeInputFile: ElementRef;
  @ViewChild('form') a: ElementRef;

  public titre: String;
  public contenu: String;
  public categories: Array<Categorie>;
  public files: Array<any>;
  public category: any;
  public length: number;
  public file: any;
  private notifyConfig: Object;
  @Output() onFileSelect: EventEmitter<File[]> = new EventEmitter();

  constructor(
    private Categories: CategoriesService,
    private Posts: PostsService,
    private titleService: Title,
    private notify: SnotifyService,
    private route: Router
  ) {
     this.notifyConfig = {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    };
    this.categories = [];
    this.length = 0;
   }

  ngOnInit() {
    this.setTitle('New Post');
    this.Categories.getAll().then((data) => {
      this.categories = data.art;
    });
  }

  private setTitle( newTitle: string): void {
      this.titleService.setTitle( newTitle );
  }

  public create (): void {

    if (this.category) {
      console.log(this.category)
      const formElement = new FormData(document.querySelectorAll('form')[1]);
      formElement.append('category', this.category);
      this.Posts.insert(formElement).then((data) => {
        this.notify.success('Post successfully created', this.notifyConfig);
        this.route.navigate([`admin/edit/posts/${this.titre}/${data.id}`]);
        this.file = [];
        this.files = [];
        this.length = 0;
        this.titre = undefined;
        this.contenu = undefined;
        this.category = undefined;
      }, (err) => {
        console.log(err);
      });
    }else {
      this.notify.error('Category field is empty !!', this.notifyConfig);
    }

  }

  FileSelect($event): void {

    this.files = $event.srcElement.files;
    this.length = this.files.length;
  
  }

  selectFile() {
    this.nativeInputFile.nativeElement.click();
  }

}
