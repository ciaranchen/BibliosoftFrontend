import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../utils/api.service";
import {RouterRedirectService} from "../../../utils/router-redirect.service";
import {Borrow} from "../../../utils/DataStructs/Borrow";

@Component({
  selector: 'app-reader-borrowing',
  templateUrl: './reader-borrowing.component.html',
  styleUrls: ['./reader-borrowing.component.css']
})
export class ReaderBorrowingComponent implements OnInit {
  readerId: string;
  // reader: User;

  borrowing: Array<Borrow> = [];
  borrowed: Array<Borrow> = [];

  constructor(
    private routerRedirect: RouterRedirectService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  get_date(time: number): string {
    return new Date(time).toDateString();
  }

  ngOnInit() {
    // get reader id;
    // this.routerRedirect.only2('reader', 'librarian');
    if (localStorage.getItem('login') === 'reader') {
      this.readerId = localStorage.getItem('username');
    } else {
      this.activatedRoute.params
        .subscribe(
          value => this.readerId = value.get('reader')
        );
    }
    this.apiService.borrow_records(this.readerId)
      .then(res => {
        this.borrowing = res.filter(value => value.return_time === null);
        this.borrowed = res.filter(value => value.return_time !== null);
        console.log(res);
      });
  }
}
