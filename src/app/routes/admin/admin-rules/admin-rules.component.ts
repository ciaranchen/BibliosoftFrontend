import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../utils/message.service';
import { StateService } from '../../../utils/state.service';
import { Rule } from '../../../utils/DataStructs/Rule';
import { ApiService } from '../../../utils/api.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-rules.component.html',
  styleUrls: ['./admin-rules.component.css']
})
export class AdminRulesComponent implements OnInit {
  rule: Rule = new Rule(0, 1, 2, 3, 4);

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.stateService.only('admin');
    // todo: load old rules
    // this.apiService.
  }

  update_rule() {
    console.log(this.stateService.user);
    // this.apiService.update_rule(this.rule)
  }
}
