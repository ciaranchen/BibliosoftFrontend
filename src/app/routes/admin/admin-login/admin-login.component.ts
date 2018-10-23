import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../utils/api.service";
import {Message, MessageService} from "../../../utils/message.service";
import {StateService} from "../../../utils/state.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css', '../../../login.css']
})
export class AdminLoginComponent implements OnInit {
  user: string;
  pass: string;

  constructor(
    private stateService: StateService,
    private messageService: MessageService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.stateService.need_not_login();
  }

  admin_login(user?: string, pass?: string) {
    this.apiService.login(user ? user : this.user, pass ? pass : this.pass, 1)
      .then(res => {
        this.stateService.login('admin', res);
      }).catch((err) => {
        this.messageService.messages.push(new Message(err.error.msg, 'danger'));
      });
  }
}
