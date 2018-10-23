import { Component, OnInit } from '@angular/core';
import {User} from '../../../utils/DataStructs/User';
import { ApiService } from '../../../utils/api.service';
import { ActivatedRoute } from '@angular/router';
import {StateService} from "../../../utils/state.service";

@Component({
  selector: 'app-reader-profile',
  templateUrl: './reader-profile.component.html',
  styleUrls: ['./reader-profile.component.css']
})
export class ReaderProfileComponent implements OnInit {

  reader: User;
  showReader: User = new User('', '');

  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.stateService.only2('reader', 'librarian');
    // get url params
    this.activedRoute.params.subscribe(
      val => {
        // console.log(val);
        const readerId = val['forlibrarian'];
        if (!readerId) {
          // should user_login as reader
          this.stateService.only('reader');
          // get user information
          this.reader = this.stateService.user;
        } else {
          this.apiService.get_account('reader', readerId)
            .then(res => {
              if (res[0].username !== readerId) {
                console.error('no such a user');
                this.stateService.back_home();
              }
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
        // todo: do sth
      });
  }
}
