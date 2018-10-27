import {Component, OnInit} from '@angular/core';
import {User} from '../../../utils/DataStructs/User';
import {ApiService} from '../../../utils/api.service';
import {ActivatedRoute} from '@angular/router';
import {StateService} from "../../../utils/state.service";
import {Message, MessageService} from "../../../utils/message.service";

@Component({
  selector: 'app-reader-profile',
  templateUrl: './reader-profile.component.html',
  styleUrls: ['./reader-profile.component.css']
})
export class ReaderProfileComponent implements OnInit {
  reader: User;
  showReader: User = new User('', '');

  constructor(
    private messageService: MessageService,
    private stateService: StateService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.stateService.only_rl();
    // get url params
    if (this.stateService.role === 'reader') {
      this.reader = this.stateService.user;
      Object.assign(this.showReader, this.reader);
    } else {
      const readerId = this.activatedRoute.snapshot.paramMap.get('reader');
      console.log(readerId);
      this.apiService.get_account('reader', readerId)
        .then(res => {
          if (res[0].username !== readerId) {
            console.error('no such a user');
            this.stateService.back_home();
          }
          this.reader = res[0];
        }).then(() => Object.assign(this.showReader, this.reader));
    }
  }

  submit() {
    const diff = ApiService.get_diff(this.reader, this.showReader);
    // never exists update username;
    delete diff['username'];
    this.apiService.update_account('reader', this.reader.username, diff)
      .then(res => {
        this.reader = this.showReader;
        this.messageService.messages.push(new Message('update success', 'success'));
      });
  }
}
