import { Component, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ThemeOptions } from '../../../../../theme-options';
import { TokenHelper } from 'src/app/_common';
import { Router } from '@angular/router';
import { userMessagesAndNotification } from 'src/app/_common/_helper/enum';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  userdetailsmsgsnotifications:any;
  faCalendar = faCalendar;
  user=TokenHelper.getUserName();
  loading:boolean = false;
  toggleDrawer() {
    this.globals.toggleDrawer = !this.globals.toggleDrawer;
  }

  constructor(public globals: ThemeOptions, private router : Router) {
  }

  ngOnInit() {
    if (this.user.userId) {
      // this.UserId = this.user.userId
      // if (this.UserId)
        // this.GetUserById();
     }
     this.GetUserById();

  }
  Logout()
  {
    TokenHelper.removeAccessToken();
    this.router.navigate(['/login']);
  }
  GetUserById(){
    this.loading = true;
    // this.userdetailsmsgsnotifications = userMessagesAndNotification.find(user => user.id === this.user.userId.toString());
    this.userdetailsmsgsnotifications = userMessagesAndNotification.find(user => user.id ==="01");
    debugger
    this.loading = false;

  }

}
