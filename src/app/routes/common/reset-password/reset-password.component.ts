import { Component, OnInit } from '@angular/core';
import {MatSlideToggleChange} from "@angular/material";
import {ApiService} from "../../../utils/api.service";
import {MessageService} from "../../../utils/message.service";
import {StateService} from "../../../utils/state.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  toggle_check = false;
  checked = false;

  user: string;
  token: string;
  password: string;

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.stateService.need_not_login();
  }

  change_check($event: MatSlideToggleChange) {
    this.checked = $event.checked;
  }

  send_mail() {
    this.apiService.reset_password_nologin1(this.user)
      .then(() => {
        this.messageService.push_message('An email has been sent to you.');
        this.toggle_check = true;
        this.checked = true;
      }).catch(err => {
      this.messageService.push_message('Some thing may wrong.');
    });
  }

  reset_password() {
    this.apiService.reset_password_nologin2(this.user, this.token, this.password)
      .then(() => {
        this.stateService.to_login()
          .then(() => {
            this.messageService.push_message('reset password sucess, please login again.', 'sucess');
          })
      });
  }
}
