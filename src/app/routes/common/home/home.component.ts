import { Component, OnInit } from '@angular/core';
import { MessageService, Message } from '../../../utils/message.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.messageService.messages.push(new Message('test msg', 'test title', 'info'));
  }
}
