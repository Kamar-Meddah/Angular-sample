import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../../../services/users.service';
import { SnotifyService } from 'ng-snotify';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent implements OnInit {

  public oldPassword: String;
  public newPassword: String;

  private notifyConfig: Object;

  constructor(
              private Users: UsersService,
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
    this.setTitle(`Password Edit`);
  }

  public changePassword (): void {
    const id = JSON.parse(localStorage.getItem('user')).id;
    this.Users.checkPass(id, this.oldPassword).then((data) => {
      if (data) {
          this.Users.changePass(id, this.newPassword);
          this.notify.success('Password successfully changed', this.notifyConfig);
          this.newPassword = '';
          this.oldPassword = '';
      } else {
        this.notify.error('Wrong password', this.notifyConfig);
      }
    });
  }

  private setTitle( newTitle: string): void {

      this.titleService.setTitle( newTitle );

  }

}
