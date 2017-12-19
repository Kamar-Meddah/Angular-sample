import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { Title } from '@angular/platform-browser';
import * as jwtDecode from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-username-edit',
  templateUrl: './username-edit.component.html',
  styleUrls: ['./username-edit.component.css']
})
export class UsernameEditComponent implements OnInit {

  public oldPassword: String;
  public newUsername: String;
  private id: number;


  constructor(
              private Users: UsersService,
              private notify: ToastrService,
              private titleService: Title
            ) {
                this.id = jwtDecode(localStorage.getItem('token')).sub;
              }

  ngOnInit() {
    this.setTitle(`Username Edit`);
  }

  public changeUsername (): void {
    this.Users.checkPass(this.id, this.oldPassword).then((data) => {
      if (data) {
          this.Users.changeUsername(this.id, this.newUsername);
          this.notify.success('Username successfully changed');
          this.newUsername = '';
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
