import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private navBar: Boolean;
  private input: String;

  constructor(private users: UsersService, private route: Router) { }

  ngOnInit() {
    this.switchNavBar();
  }

  private switchNavBar (): void {

    this.users.isLogged().then((data) => {
    this.navBar = data;
    });

  }

  private search (): void {

    this.route.navigate([`/search/${this.input}/1`]);

  }

}
