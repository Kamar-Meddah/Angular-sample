
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../services/categories.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {


  public titre: String;
  private id: number;

  constructor(
    private Service: CategoriesService,
    private titleService: Title,
    private notify: ToastrService,
    private router: ActivatedRoute
  ) {
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
      this.notify.success('Categorie successfully upated');
    });
  }

  private getId (): void {
    this.router.params.subscribe((params) => {
      this.id = params.id;
    });
  }


}
