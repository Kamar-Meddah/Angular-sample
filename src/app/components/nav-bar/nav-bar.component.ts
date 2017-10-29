import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public navBar: Boolean;
  public input: String;

  constructor(private users: UsersService, private route: Router) { }

  ngOnInit() {
    this.switchNavBar();
  }

  public switchNavBar (): void {

    this.users.isLogged().then((data) => {
    this.navBar = data;
    });

  }

  public search (): void {

    this.route.navigate([`/search/${this.input}/1`]);

  }

}
