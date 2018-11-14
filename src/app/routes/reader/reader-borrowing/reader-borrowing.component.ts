import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../utils/api.service';
import {Borrow} from '../../../utils/DataStructs/Borrow';
import {StateService} from '../../../utils/state.service';
import {Reserve} from "../../../utils/DataStructs/Reserve";
import {MessageService} from "../../../utils/message.service";

@Component({
  selector: 'app-reader-borrowing',
  templateUrl: './reader-borrowing.component.html',
  styleUrls: ['./reader-borrowing.component.css']
})
export class ReaderBorrowingComponent implements OnInit {
  readerId: string;
  borrowing: Array<Borrow> = [];
  borrowed: Array<Borrow> = [];

  reserves: Reserve[] = [];

  constructor(
    public stateService: StateService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
  ) { }

  get_date(time: number): string {
    return new Date(time).toDateString();
  }

  ngOnInit() {
    // get reader id;
    this.stateService.only_rl();
    if (this.stateService.role === 'reader') {
      this.readerId = this.stateService.user.username;
    } else {
      this.activatedRoute.params
        .subscribe(value => this.readerId = value['reader']);
    }
    this.apiService.borrow_records(this.readerId)
      .then(res => {
        this.borrowing = res.filter(value => value.return_time === null);
        this.borrowed = res.filter(value => value.return_time !== null);
      });
    this.apiService.get_reserves()
      .then(res => this.reserves = res.filter(value => value.usable));
  }

  get_valid_time(valid_until: string): string {
    return new Date(valid_until).toLocaleString('en');
  }

  remove_reserve(x: Reserve) {
    this.apiService.cancel_reserve(x.id)
      .then(() => {
        const index = this.reserves.findIndex(val => val === x);
        this.reserves.splice(index, 1);
        this.messageService.push_message('cancel success', 'success');
      });
  }
}
