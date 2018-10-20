import { Component, OnInit } from '@angular/core';
import {User} from '../../../utils/DataStructs/User';
import {RouterRedirectService} from '../../../utils/router-redirect.service';
import { ApiService } from '../../../utils/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reader-profile',
  templateUrl: './reader-profile.component.html',
  styleUrls: ['./reader-profile.component.css']
})
export class ReaderProfileComponent implements OnInit {

  reader: User;
  showReader: User = new User('', '');

  constructor(
    private routerRedirect: RouterRedirectService,
    private apiService: ApiService,
    private activedRoute: ActivatedRoute
  ) { }

  load_user_data() {

  }

  ngOnInit() {
    // this.routerRedirect.only2('reader', 'librarian');
    // get url params
    this.activedRoute.params.subscribe(
      val => {
        // console.log(val);
        const readerId = val['forlibrarian'];
        if (!readerId) {
          // should login as reader
          this.routerRedirect.only('reader');
          // get user information
          this.reader = new User(
            localStorage.getItem('username'),
            localStorage.getItem('email'),
            localStorage.getItem('nickname'),
            localStorage.getItem('address') !== null ? localStorage.getItem('address') : '',
            localStorage.getItem('slogan') !== null ? localStorage.getItem('slogan') : '');
        } else {
          this.apiService.get_account('reader', readerId)
            .then(res => {
              // todo: check res[0].username and readerId;
              this.reader = res[0];
            });
        }
        // console.log(this.reader);
        Object.assign(this.showReader, this.reader);
      },
    );
  }

  submit() {
    const diff = {};
    for (const key in this.reader) {
      if (this.reader[key] !== this.showReader[key]) {
        diff[key] = this.showReader[key];
      }
    }
    // never exists update username;
    delete diff['username'];
    this.apiService.update_account('reader', this.reader.username, diff)
      .then(res => {

      });
  }
}
