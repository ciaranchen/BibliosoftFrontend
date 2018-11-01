import { Component, OnInit } from '@angular/core';
import { MetaBook } from '../../../utils/DataStructs/MetaBook';
import { Payment} from '../../../utils/DataStructs/Payment';


// todo: fix it
@Component({
  selector: 'app-reader-view-payment',
  templateUrl: './reader-view-payment.component.html',
  styleUrls: ['./reader-view-payment.component.css']
})
export class ReaderViewPaymentComponent implements OnInit {
  book: MetaBook = {
    isbn: 'string',
    title: 'string',
    author: 'string',
    publisher: 'string',
    keyword: 'string',
    publish_year: 123,
    pages: 123,
    cover: 'string',
    subtitle: 'string',
    desc_html: 'string'
  };
  pay = '123';
  payment: Payment = new Payment(this.book, this.pay);
  payments: Payment[] = [this.payment, this.payment];

  constructor() { }

  ngOnInit() {
  }
  // onClick(): void {
  //   // to get payment
  //   this.pay = '0';
  //   console.log(this.payments[0].book.title);
  // }
  onSelect(b: Payment): void {
    this.payment = b;
  }
}
