import { Component, OnInit} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private navBar: Boolean;
  private isAdmin: Boolean;
  private input: String;

  constructor(private users: UsersService, private route: Router, private notify: ToastrService) {}

  ngOnInit() {
    this.switchNavBar();
    this.users.getEmitedValue().subscribe((data) => {
      this.navBar = data;
    });
    this.users.getIsAdmin().subscribe((data) => {
      this.isAdmin = data;
    });

  }

  public switchNavBar (): void {

    this.navBar = this.users.isLogged();
    this.isAdmin = this.users.isAdmin();

  }

  public search (): void {

    this.route.navigate([`/search/${this.input}/1`]);

  }

  public logout () {
    this.users.logout();
    this.notify.success('you are disconnected');
    this.users.change();
    this.route.navigate([`/`]);
  }

}
