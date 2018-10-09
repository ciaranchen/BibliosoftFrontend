import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../utils/book';
import { BookService } from '../../utils/book.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const ISBN = this.route.snapshot.paramMap.get('ISBN');
    this.bookService.getBook(ISBN).subscribe(books => this.book = books[0]);
  }

  goBack(): void {
    this.location.back();
  }
}
