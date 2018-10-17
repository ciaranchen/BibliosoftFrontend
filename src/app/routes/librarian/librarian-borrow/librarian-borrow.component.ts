import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../utils/api.service";
import {User} from "../../../utils/DataStructs/User";
import {RouterRedirectService} from "../../../utils/router-redirect.service";
import {MetaBook} from "../../../utils/DataStructs/MetaBook";

@Component({
  selector: 'app-librarian-borrow',
  templateUrl: './librarian-borrow.component.html',
  styleUrls: ['./librarian-borrow.component.css']
})
export class LibrarianBorrowComponent implements OnInit {

  readerId: string;
  cacheReaderId: string;

  barcode: string;
  cacheBarcode: string;

  reader: User;
  book: MetaBook;

  constructor(
    private routerRedirect: RouterRedirectService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    // this.routerRedirect.only('librarian');
  }

  search_reader() {
    if (this.readerId === this.cacheReaderId) {
      return;
    }
    this.apiService.get_account('reader', this.readerId)
      .then(res => {
        if (res.length === 0 || res[0].username !== this.readerId) {
          // not found
          console.error('not that user');
        } else {
          this.reader = res[0];
        }
      }).catch(err => {
        console.error(err);
      });
  }

  search_book() {
    if (this.cacheBarcode === this.barcode) {
      return;
    }
  }

  borrow() {
    this.apiService.borrow(this.readerId, this.barcode)
      .then(() => {
        // todo: do sth
      })
      .catch(err => {
        console.error(err);
      });
  }
}
