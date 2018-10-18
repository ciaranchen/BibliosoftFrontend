import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../utils/api.service";
import {User} from "../../../utils/DataStructs/User";
import {RouterRedirectService} from "../../../utils/router-redirect.service";
import {Book} from "../../../utils/DataStructs/Book";

@Component({
  selector: 'app-librarian-return',
  templateUrl: './librarian-return.component.html',
  styleUrls: ['./librarian-return.component.css']
})
export class LibrarianReturnComponent implements OnInit {

  readerId: string;
  cacheReaderId: string;

  reader: User;
  borrowed: Book;

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
    // todo: get the book he is borrow;
  }

  search_fine() {
    // todo: get each fine;
  
  }

  return() {
    // todo: return book;
  }
}
