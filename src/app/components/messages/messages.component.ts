import { Component, OnInit } from '@angular/core';
import {Message, MessageService} from '../../utils/message.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  message: Message = new Message('', '');

  constructor(
    public messageService: MessageService,
    public router: ActivatedRoute
  ) { }

  ngOnInit() {
    // get url param
    this.router
      .queryParams.subscribe(
      value => {
        const msg = value['msg'];
        if (msg) {
          this.message.msg = msg;
          this.message.title = value['msg_title'] ? value['msg_title'] : '';
          const type = value['msg_type'];
          this.message.type =  (type && Message.isAlert(type)) ? 'alert-' + type : 'alert-info';
        }
      });
  }

  render_message(message) {
    return (message.title === '' || message === undefined) ? message.msg : `<strong>${message.title} </strong> ${message.msg}`;
  }
}
