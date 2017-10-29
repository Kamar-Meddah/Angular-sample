import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  public constructor(private titleService: Title) { }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.setTitle('Error 404 NotFound');
  }

}
