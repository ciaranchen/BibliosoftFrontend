import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../../../utils/book.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {MetaBook} from "../../../utils/DataStructs/MetaBook";

// todo: finish this page
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: MetaBook;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void { // to get metaBook information from backend
    const ISBN = this.route.snapshot.paramMap.get('ISBN');
    // this.bookService.getBook(ISBN).subscribe(books => this.book = books[0]);
  }

  goBack(): void {
    this.location.back();
  }
}
