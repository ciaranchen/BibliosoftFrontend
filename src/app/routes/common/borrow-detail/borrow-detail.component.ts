import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../utils/api.service';
import { Borrow } from 'src/app/utils/DataStructs/Borrow';
import { ActivatedRoute } from '@angular/router';
import {StateService} from "../../../utils/state.service";
import {User} from "../../../utils/DataStructs/User";
import {Book} from "../../../utils/DataStructs/Book";
import {MetaBook} from "../../../utils/DataStructs/MetaBook";
@Component({
  selector: 'app-borrow-detail',
  templateUrl: './borrow-detail.component.html',
  styleUrls: ['./borrow-detail.component.css']
})
export class BorrowDetailComponent implements OnInit {
  borrow: Borrow = new Borrow();
  book: Book = new Book();
  metaBook: MetaBook = new MetaBook('', '', '', '');
  reader: User = new User();
  librarian: User = new User();

  // borrow: Borrow;
  borrow_id: string;

  constructor(
    public stateService: StateService,
    private apiService: ApiService,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.stateService.only_rl();
    this.borrow_id = this.activateRoute.snapshot.paramMap.get('borrow');
    // console.log(this.borrow_id);
    this.apiService.get_borrow(this.borrow_id)
      .then(res => {
        this.borrow = res;
        this.apiService.get_book(res.barcode)
          .then(res => {
            this.book = res;
            this.apiService.get_meta_book(res.isbn)
              .then(res => this.metaBook = res);
          });
        this.apiService.get_account('reader', res.reader_id)
          .then(res => {
            this.reader = res[0];
          });
        if (this.stateService.role === 'librarian') {
          this.apiService.get_account('librarian', res.librarian_id)
            .then(res => this.librarian = res[0]);
        }

      // }).catch(err => {
      // console.error('404');
      // this.stateService.back_home();
    });
  }

  download_barcode () {
    ApiService.download_barcode(this.borrow.barcode);
  }
}
