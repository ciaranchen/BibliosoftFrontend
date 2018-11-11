import { Injectable } from '@angular/core';

export class Message {
  public type: string;

  constructor(
    public msg: string,
    type?: string,
  ) {
    this.type = Message.isAlert(type) ? 'alert-' + type : 'alert-info';
  }

  static isAlert(alert: string): boolean {
    return (alert === 'primary' || alert === 'secondary' || alert === 'success' || alert === 'danger'
      || alert === 'warning' || alert === 'info' || alert === 'light' || alert === 'dark');
  }
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Array<Message> = [];

  push_message(msg: string, type: string): void {
    this.messages.push(new Message(msg, type));
  }
}
