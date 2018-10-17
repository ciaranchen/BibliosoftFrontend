import { Injectable } from '@angular/core';

export class Message {
  public type: string;

  constructor(
    public msg: string,
    public title: string = '',
    type?: string,
  ) {
    this.type = Message.isAlert(type) ? 'alert-' + type: 'alert-info';
  }

  static isAlert(alert: string): boolean {
    return (alert === 'primary' || alert === 'secondary' || alert === 'success' || alert === 'danger' || alert === 'warning' || alert === 'info' || alert === 'light' || alert === 'dark');
  }
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Array<Message> = new Array<Message>();
}
