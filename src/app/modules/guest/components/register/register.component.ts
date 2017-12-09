import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../../../services/users.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { Title } from '@angular/platform-browser';
import { NavBarComponent } from './../../../../components/nav-bar/nav-bar.component';


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
  //  -------
  private notifyConfig: Object;

  constructor(
             private Users: UsersService,
             private route: Router,
             private notify: SnotifyService,
             private titleService: Title
            ) {
              this.notifyConfig = {
                timeout: 5000,
                showProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
              };
            }

  ngOnInit() {
    this.setTitle(`register`);
    this.isLogged();
  }

  public register (): void {
    if ( this.confirmpassword !== this.password ) {
      this.notify.error('the passwords does not match', this.notifyConfig);
    } else {

      this.Users.register( this.email, this.password, this.username).then((data) => {

        if (data.created === false) {
          this.notify.error('Email already existed', this.notifyConfig);
        } else {
          this.notify.success('Account succesfully created', this.notifyConfig);
          this.route.navigate([`/login`]);
        }

      });
    }

  }

  private isLogged (): void {

        if (this.Users.isLogged()) {

          this.notify.warning('already logged', this.notifyConfig);
          this.route.navigate([`/`]);

        } else if (this.Users.isAdmin()) {

          this.notify.warning('already logged', this.notifyConfig);
          this.route.navigate([`/admin/home`]);

        }

  }

  private setTitle( newTitle: string): void {

    this.titleService.setTitle( newTitle );

  }

}
