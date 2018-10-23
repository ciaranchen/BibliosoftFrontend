import { Component, OnInit } from '@angular/core';
import {Message, MessageService} from '../../utils/message.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  message: Message = new Message('');

  constructor(
    public messageService: MessageService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // get url param
    this.activatedRoute
      .queryParams.subscribe(
      value => {
        const msg = value['msg'];
        if (msg) {
          this.message.msg = msg;
          const type = value['msg_type'];
          this.message.type =  (type && Message.isAlert(type)) ? 'alert-' + type : 'alert-info';
        }
      });
  }
}
