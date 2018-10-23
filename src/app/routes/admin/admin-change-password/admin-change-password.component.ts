import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../utils/api.service';
import { MessageService, Message } from '../../../utils/message.service';
import { StateService } from "../../../utils/state.service";

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {

  old_pwd: string;
  new_pwd1: string;
  new_pwd2: string;

  constructor(
    private stateService: StateService,
    private messageService: MessageService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.stateService.only('admin');
  }

  submit_available(): boolean {
    return this.new_pwd1 !== this.new_pwd2;
  }

  change_password() {
    // to change pwd
    this.apiService.reset_admin_password(this.old_pwd, this.new_pwd1)
      .then(res => {
        this.messageService.messages.push(
          new Message('success change password', '', 'success')
        );
      });
  }
}
