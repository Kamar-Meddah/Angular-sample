import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private navBar: Boolean;

  constructor(private users: UsersService) { }

  ngOnInit() {
    this.switchNavBar();
  }

  private switchNavBar (): void{
    this.users.isLogged().then((data) => {
    this.navBar = data;
    });
  }

}
