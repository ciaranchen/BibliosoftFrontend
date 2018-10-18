import { Component, OnInit } from '@angular/core';
import {User} from "../../../utils/DataStructs/User";
import {RouterRedirectService} from "../../../utils/router-redirect.service";

@Component({
  selector: 'app-reader-profile',
  templateUrl: './reader-profile.component.html',
  styleUrls: ['./reader-profile.component.css']
})
export class ReaderProfileComponent implements OnInit {

  reader: User;

  constructor(
    private routerRedirect: RouterRedirectService,

  ) { }

  load_user_data() {

  }

  ngOnInit() {
    this.routerRedirect.only2('reader', 'librarian');
    const login = localStorage.getItem('login');
    if (login === 'librarian') {
      // todo: load user data
    } else {
      this.reader = new User(
        localStorage.getItem('username'),
        localStorage.getItem('email'),
        localStorage.getItem('nickname'),
        localStorage.getItem('address'),
        localStorage.getItem('slogan'));
    }
  }

  submit() {
    for (let key in this.reader) {

    }
  }
}
