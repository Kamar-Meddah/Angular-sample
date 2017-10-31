import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../../../services/users.service';
import { SnotifyService } from 'ng-snotify';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-username-edit',
  templateUrl: './username-edit.component.html',
  styleUrls: ['./username-edit.component.css']
})
export class UsernameEditComponent implements OnInit {

  public oldPassword: String;
  public newUsername: String;

  private notifyConfig: Object;

  constructor(
              private Users: UsersService,
              private notify: SnotifyService,
              private cookies: CookieService,
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
    this.setTitle(`Username Edit`);
  }

  public changeUsername (): void {
    const id = parseInt(this.cookies.get('id'), 10);
    this.Users.checkPass(id, this.oldPassword).then((data) => {
      if (data) {
          this.Users.changeUsername(id, this.newUsername);
          this.notify.success('Username successfully changed', this.notifyConfig);
          this.newUsername = '';
          this.oldPassword = '';
      }else {
        this.notify.error('Wrong password', this.notifyConfig);
      }
    });
  }

  private setTitle( newTitle: string): void {

      this.titleService.setTitle( newTitle );

  }

}
