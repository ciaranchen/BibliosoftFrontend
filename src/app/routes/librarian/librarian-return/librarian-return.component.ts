import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../utils/api.service';
import {User} from '../../../utils/DataStructs/User';
import {Borrow} from '../../../utils/DataStructs/Borrow';
import { MessageService, Message } from '../../../utils/message.service';
import {StateService} from "../../../utils/state.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Fine} from "../../../utils/DataStructs/Fine";

@Component({
  selector: 'app-librarian-return',
  templateUrl: './librarian-return.component.html',
  styleUrls: ['./librarian-return.component.css']
})
export class LibrarianReturnComponent implements OnInit {

  readerId: string;
  cacheReaderId: string;

  reader: User;
  borrowed: Array<Borrow>;

  // willReturn: Array<Borrow> = [];
  fine: Fine;
  returning: string;

  constructor(
    public modalService: NgbModal,
    private messageService: MessageService,
    private stateService: StateService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.stateService.only('librarian');
  }

  search_reader() {
    if (this.readerId === this.cacheReaderId) {
      return;
    }
    this.cacheReaderId = this.readerId;
    this.apiService.get_account('reader', this.readerId)
      .then(res => {
        if (res.length === 0 || res[0].username !== this.readerId) {
          // not found
          console.error('not that user');
        } else {
          this.reader = res[0];
        }
      });
    this.apiService.borrow_records(this.readerId, true)
      .then(res => {
        // filter not return_time
        this.borrowed = res.filter(val => val.return_time === null);
      }).catch(err => {
        console.error(err);
      });
  }

  click_return(modal) {
    const selectedOptions = (<HTMLSelectElement>document.getElementById('borrowed')).selectedOptions;
    if (selectedOptions.length === 0) {
      this.messageService.messages.push(new Message('You have not chose any book yet', 'danger'));
      return;
    }
    const optionElem = selectedOptions[0];
    // console.log(optionElem);

    const borrowId = optionElem.value;
    console.log(borrowId);
    // return book
    this.returning = borrowId;
    this.apiService.return_book(borrowId)
      .then(res => {
        console.log(res);
        if (res) {
          this.return_success();
        } else {
          // load fine
          this.apiService.borrow_fine(this.returning)
            .then(res => this.fine = res);
          this.modalService.open(modal);
        }
      });
  }

  return_success() {
    // delete this borrow item
    const index = this.borrowed.findIndex(val => val.id === this.returning);
    this.borrowed.splice(index, 1);
    this.messageService.messages.push(new Message('return success', 'success'))
  }

  paid_fine() {
    this.apiService.pay_fine(this.returning)
      .then(() => {
        this.return_success();
      });
    this.modalService.dismissAll();
  }
}
