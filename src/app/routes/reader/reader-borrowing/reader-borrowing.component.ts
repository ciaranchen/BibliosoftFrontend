import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../utils/api.service";
import {Borrow} from "../../../utils/DataStructs/Borrow";
import {StateService} from "../../../utils/state.service";

@Component({
  selector: 'app-reader-borrowing',
  templateUrl: './reader-borrowing.component.html',
  styleUrls: ['./reader-borrowing.component.css']
})
export class ReaderBorrowingComponent implements OnInit {
  readerId: string;
  borrowing: Array<Borrow> = [];
  borrowed: Array<Borrow> = [];

  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
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
  }
}
