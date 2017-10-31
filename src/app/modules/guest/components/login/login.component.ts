import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../../../services/users.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';
import { NavBarComponent } from './../../../../components/nav-bar/nav-bar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: String;
  public password: String;
  //  -------
  private notifyConfig: Object;

  constructor(
             private Users: UsersService,
             private route: Router,
             private notify: SnotifyService,
             private cookie: CookieService,
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
    this.setTitle(`Login`);
    this.isLogged();
  }

  public login (): void {

    this.Users.login(this.username, this.password).then((data) => {
      if (data.bool === true) {
        this.cookie.set('id', data.id);
        this.notify.success('Welcome to the administration', this.notifyConfig);
        this.Users.change();
        this.route.navigate([`/admin/home`]);

      }else {
        this.notify.error('Wrong username or password', this.notifyConfig);
      }
    });

  }

  private isLogged (): void {

        if (this.Users.isLogged()) {
          this.notify.warning('already logged', this.notifyConfig);
          this.route.navigate([`/admin/home`]);
        }

  }

  private setTitle( newTitle: string): void {

    this.titleService.setTitle( newTitle );

  }

}
