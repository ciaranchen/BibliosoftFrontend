import { Component, OnInit } from '@angular/core';
import { MessageService} from '../../../utils/message.service';
import { StateService } from "../../../utils/state.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private stateService: StateService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // this.messageService.messages.push(new Message('test msg', 'test title', 'info'));
  }
}
