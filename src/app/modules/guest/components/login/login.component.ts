import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../../../services/users.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username: String;
  private password: String;
  //  -------
  private notifyConfig: Object;

  constructor(private Users: UsersService, private route: Router, private notify: SnotifyService) {

    this.notifyConfig = {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    };

   }

  ngOnInit() {
    this.isLogged();
  }

  private login (): void {

    this.Users.login(this.username, this.password).then((data) => {
      if (data === true) {
        this.notify.success('Welcome to the administration', this.notifyConfig);
        this.route.navigate([`/admin/home`]);
      }else {
        this.notify.error('Wrong username or password', this.notifyConfig);
      }
    });

  }

  private isLogged (): void {
    this.Users.isLogged().then((data) => {
      if (data === true) {
        this.notify.warning('already logged', this.notifyConfig);
        this.route.navigate([`/admin/home`]);
      }
    });
  }

}
