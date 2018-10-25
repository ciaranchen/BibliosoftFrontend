import { Component, OnInit } from '@angular/core';
import { MessageService, Message } from '../../../utils/message.service';
import { StateService } from '../../../utils/state.service';
import { Rule } from '../../../utils/DataStructs/Rule';
import { ApiService } from '../../../utils/api.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  rule: Rule;

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.stateService.only('admin');
    // load old rules
    // this.apiService.
  }

  update_rule() {
    // this.apiService.update_rule(this.rule)
  }
}
