import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { Title } from '@angular/platform-browser';
import * as jwtDecode from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent implements OnInit {

  public oldPassword: String;
  public newPassword: String;
  private id: number;


  constructor(
              private Users: UsersService,
              private notify: ToastrService,
              private titleService: Title
            ) {
                this.id = jwtDecode(localStorage.getItem('token')).sub;
              }

  ngOnInit() {
    this.setTitle(`Password Edit`);
  }

  public changePassword (): void {

    this.Users.checkPass(this.id, this.oldPassword).then((data) => {
      if (data) {
          this.Users.changePass(this.id, this.newPassword);
          this.notify.success('Password successfully changed');
          this.newPassword = '';
          this.oldPassword = '';
      } else {
        this.notify.error('Wrong password');
      }
    });
  }

  private setTitle( newTitle: string): void {

      this.titleService.setTitle( newTitle );

  }

}
