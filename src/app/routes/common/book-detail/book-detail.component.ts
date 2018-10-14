import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import {MetaBook} from "../../../utils/DataStructs/MetaBook";
import {ApiService} from "../../../utils/api.service";
import {Book} from "../../../utils/DataStructs/book";

// todo: finish this page
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  metaBook: MetaBook;
  books: Array<Book>;
  isbn: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    // todo: check status
  }

  ngOnInit(): void {
    // to get metaBook information from backend
    this.isbn = this.activateRoute.snapshot.paramMap.get('ISBN');
    this.apiService.get_meta_book(this.isbn).then(
      res => {
        this.metaBook = res;
        // todo: deal with metaBook's desc_html
        // todo: deal with metaBook's cover url
      }
    );
    // todo: get_books
    // this.apiService.get_books();
  }
}
