import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Categorie } from './../../../../../interfaces/categorie';
import { Image } from './../../../../../interfaces/image';
import { CategoriesService } from './../../../../../services/categories.service';
import { ImagesService } from './../../../../../services/images.service';
import { PostsService } from './../../../../../services/posts.service';
import { Title } from '@angular/platform-browser';
import { SnotifyService } from 'ng-snotify';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-edit',
  templateUrl: './posts-edit.component.html',
  styleUrls: ['./posts-edit.component.css']
})
export class PostsEditComponent implements OnInit {

  @ViewChild('inputFile') nativeInputFile: ElementRef;
  @ViewChild('form') a: ElementRef;

  public titre: String;
  public contenu: String;
  public categories: Array<Categorie>;
  public images: Array<Image>;
  public files: Array<any>;
  public category: any;
  public length: number;
  public file: any;
  private notifyConfig: Object;
  private id: number;
  @Output() onFileSelect: EventEmitter<File[]> = new EventEmitter();
  public title = 'Delete confirm';
  public message = 'delete selected Element ?';
  public confirmClicked = false;
  public cancelClicked = false;

  constructor(
    private Categories: CategoriesService,
    private Images: ImagesService,
    private Posts: PostsService,
    private titleService: Title,
    private notify: SnotifyService,
    private route: ActivatedRoute
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
    this.route.params.subscribe((params) => {
      this.setTitle(`Edit ${params.title}`);
      this.Categories.getAll().then((data) => {
        this.categories = data.art;
      });
      this.Images.find(params.id).then((data) => {
        this.images = data;
      });
      this.Posts.find(params.id).then((data) => {
        this.id = data.id;
        this.titre = data.titre;
        this.contenu = data.contenu;
        this.category = data.categoryId;
      });
    });

  }

  private setTitle( newTitle: string): void {
      this.titleService.setTitle( newTitle );
  }

  public update (): void {

      const formElement = new FormData(document.querySelectorAll('form')[1]);
      formElement.append('category', this.category);
      this.Posts.edit(formElement).then((data) => {
        data.forEach(img => {
          this.images.push({'id': img.id, 'name': `${img.id}.jpg`, 'articleId': this.id});
        });
        this.notify.success('Post successfully updated', this.notifyConfig);
        this.file = [];
        this.files = [];
        this.length = 0;
      }, (err) => {
        console.log(err);
      });

  }

  public FileSelect($event): void {

    this.files = $event.srcElement.files;
    this.length = this.files.length;

  }

  public selectFile() {

    this.nativeInputFile.nativeElement.click();

  }

  public deleteImg(id, index) {
    this.Images.delete(id).then((data) => {
      this.images.splice(index, 1);
      this.notify.success('Image successfully Deleted', this.notifyConfig);
    });
  }


}
