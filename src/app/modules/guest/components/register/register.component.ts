import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email: String;
  public password: String;
  public username: String;
  public confirmpassword: String;

  constructor(
             private Users: UsersService,
             private route: Router,
             private notify: ToastrService,
             private titleService: Title
            ) {}

  ngOnInit() {
    this.setTitle(`register`);
    this.isLogged();
  }

  public register (): void {
    if ( this.confirmpassword !== this.password ) {
      this.notify.error('the passwords does not match');
    } else {

      this.Users.register( this.email, this.password, this.username).then((data) => {

        if (data.created === false) {
          this.notify.error('Email already existed');
        } else {
          this.notify.success('Account succesfully created');
          this.route.navigate([`/login`]);
        }

      });
    }

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
