import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../utils/api.service";
import {User} from "../../../utils/DataStructs/User";
import {RouterRedirectService} from "../../../utils/router-redirect.service";
import {Borrow} from "../../../utils/DataStructs/Borrow";

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

  willReturn: Array<Borrow> = [];
  totalFine: number = 0;

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
        this.borrowed = res.filter((val) => {return val.return_time === null})
      }).catch(err => {
        console.error(err);
      });
    // todo: get the book he is borrow;
  }

  sure_return() {
    // todo: pay fine
    // ids.forEach(val => {
    //   this.apiService.return_book(val).then(
    //     () => {
    //       // todo: remove this id from borrowed;
    //     }
    //   );
    // });
  }

  onChangeSelect() {
    //
  }

  click_return() {
    const inputs = document.getElementById('borrowed').getElementsByClassName('form-check-input');
    console.log(inputs);

    // todo: fix it
    for (let i = 0; i < inputs.length; i++) {
      if ((<HTMLInputElement>inputs.item(i))) {
        const id = inputs.item(i).getAttribute('value');
        const borrowObject = this.borrowed.find(value => value.id.toString() === id);
        this.willReturn.push(borrowObject);
      }
    }
    // console.log(this.willReturn);
    // todo: get fine
  }
}
