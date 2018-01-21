import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Home';

  constructor (private userService: UsersService, private route: Router, private notify: ToastrService) {

    userService.token = localStorage.getItem('token');
    if (userService.token) {
      userService.checkToken().then((data) => {
        if (!data) {
          userService.logout();
          userService.change();
          this.notify.warning('Session expired ,you are disconnected');
          this.route.navigate([`/`]);
        }
      });
     }

  }

}
