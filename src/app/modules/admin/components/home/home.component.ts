import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isAdmin: boolean;
  public user: string;

  constructor( private Users: UsersService) { }

  ngOnInit() {
    this.isAdmin = this.Users.isAdmin();
    this.user = JSON.parse(localStorage.getItem('user')).username;
  }

}
