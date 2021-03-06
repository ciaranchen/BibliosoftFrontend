import {Component, OnInit} from '@angular/core';
import {User} from '../../../utils/DataStructs/User';
import {ApiService} from '../../../utils/api.service';
import {ActivatedRoute} from '@angular/router';
import {StateService} from '../../../utils/state.service';
import {MessageService} from '../../../utils/message.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-reader-profile',
  templateUrl: './reader-profile.component.html',
  styleUrls: ['./reader-profile.component.css']
})
export class ReaderProfileComponent implements OnInit {
  reader: User;
  showReader: User = new User();

  oldPass = '';
  newPass = '';
  newPass1 = '';

  constructor(
    public modalService: NgbModal,
    public stateService: StateService,
    private messageService: MessageService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.stateService.only_rl();
    if (this.stateService.role === 'reader') {
      this.reader = this.stateService.user;
      Object.assign(this.showReader, this.reader);
    } else {
      // get url params
      const readerId = this.activatedRoute.snapshot.paramMap.get('reader');
      console.log(readerId);
      this.apiService.get_account('reader', readerId)
        .then(res => {
          if (res[0].username !== readerId) {
            this.stateService.back_home()
              .then(() => this.messageService.push_message('no such a user', 'danger'));
          }
          this.reader = res[0];
        }).then(() => Object.assign(this.showReader, this.reader));
    }
  }

  submit() {
    // never exists update username;
    this.showReader.username = this.reader.username;
    this.apiService.update_account('reader', this.showReader)
      .then(() => {
        this.showReader.username = this.reader.username;
        this.reader = this.showReader;
        // don't forget to change it in the stateService
        if (this.stateService.role === 'reader') {
          this.stateService.update_profile(this.reader);
        }
        this.messageService.push_message('update success', 'success');
      });
  }

  change_reader_password() {
    if (this.newPass != this.newPass1) {
      this.messageService.push_message('new passwords should equal.');
      return;
    }
    this.apiService.reset_self_password(this.oldPass, this.newPass)
      .then(res => {
        if (res) {
          this.messageService.push_message('password changed.', 'success');
          this.modalService.dismissAll();
        } else {
          this.messageService.push_message('old password is wrong', 'danger');
        }
      });
  }
}
