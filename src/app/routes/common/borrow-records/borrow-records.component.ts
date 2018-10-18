import { Component, OnInit } from '@angular/core';
import {User} from "../../../utils/DataStructs/User";
import {ApiService} from "../../../utils/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-borrow-records',
  templateUrl: './borrow-records.component.html',
  styleUrls: ['./borrow-records.component.css']
})
export class BorrowRecordsComponent implements OnInit {
  readerId: User;



  // todo: create BorrowRecord Type;
  data: Object;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // get reader id;
    this.activatedRoute.params
      .subscribe(
      value => this.readerId = value.get('reader')
      );
    // todo: get user;
    // todo: get user's record;
  }
}
