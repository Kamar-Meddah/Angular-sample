import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: String;
  public password: String;
  //  -------


  constructor(
             private Users: UsersService,
             private route: Router,
             private notify: ToastrService,
             private titleService: Title
            ) {}

  ngOnInit() {
    this.setTitle(`Login`);
    this.isLogged();
  }

  public login (): void {

    this.Users.login(this.email, this.password).then((data) => {

      if (data.bool === true) {
        localStorage.setItem('token', data.token);
        this.notify.success('Welcome to the administration');
        this.Users.change();
        this.route.navigate([`/admin/home`]);

      } else {
        this.notify.error('Wrong email or password');
      }
    });

  }

  private isLogged (): void {

        if (this.Users.isLogged()) {

          this.notify.warning('already logged');
          this.route.navigate([`/admin/home`]);

        }

  }

  private setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle );
  }

}
