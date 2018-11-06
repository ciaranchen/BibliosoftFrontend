import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {MetaBook} from '../../../utils/DataStructs/MetaBook';
import {ApiService} from '../../../utils/api.service';
import {Book} from '../../../utils/DataStructs/Book';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {StateService} from '../../../utils/state.service';
import {Message, MessageService} from '../../../utils/message.service';
import {BookLocation} from '../../../utils/DataStructs/BookLocation';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  metaBook: MetaBook;
  books: Array<Book>;
  isbn: string;
  login: string;

  showMetaBook: MetaBook = new MetaBook('', '', '', '');
  editingIndex: number;
  location: BookLocation = new BookLocation();

  constructor(
    private messageService: MessageService,
    public modalService: NgbModal,
    public stateService: StateService,
    private activateRoute: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.stateService.only_rl();
    this.login = this.stateService.role;
    // to get metaBook information from backend
    if (location.pathname.startsWith('/book_by_barcode/')) {
      const barcode = this.activateRoute.snapshot.paramMap.get('barcode');
      this.apiService.get_book(barcode)
        .then(res => {
          this.isbn = res.isbn;
          this.get_book_info(this.isbn);
        });
    } else {
      this.isbn = this.activateRoute.snapshot.paramMap.get('ISBN');
      this.get_book_info(this.isbn);
    }
  }

  submit_edit_location() {
    const book: Book = new Book();
    Object.assign(book, this.books[this.editingIndex]);
    book.location = this.location.toString();
    console.log(book);
    this.apiService.update_book(book)
      .then(() => {
        this.books[this.editingIndex] = book;
        this.modalService.dismissAll();
        this.messageService.messages.push(new Message('update success', 'success'));
      });
  }

  open_edit_location($event: Event, modal) {
    const barcode = this.get_tr($event).childNodes[1].textContent;
    this.editingIndex = this.books.findIndex((book) => book.barcode.toString() === barcode.toString());
    // load Location
    this.location.from_string(this.books[this.editingIndex].location);
    console.log(this.location);
    this.modalService.open(modal, {centered: true, size: 'lg'});
  }

  private get_tr($event: Event) {
    return $event.srcElement.closest('tr');
  }

  remove_book($event: Event) {
    const barcode = this.get_tr($event).childNodes[1].textContent;
    const bookIndex = this.books.findIndex(book => book.barcode.toString() === barcode.toString());

    this.apiService.delete_book(barcode)
      .then(() => {
        this.books.splice(bookIndex, 1);
      });
  }

  download_barcode ($event: Event) {
    const barcode = this.get_tr($event).childNodes[1].textContent;
    ApiService.download_barcode(barcode);
  }

  disable_reserve() {
    return this.books.findIndex(val => val.available === true) === -1;
  }

  reserve_book() {
    this.stateService.only('reader');
    const reservable = this.books.filter(value => value.available === true);
    if (reservable.length === 0) {
      this.messageService.messages.push(new Message('no available book', 'danger'));
    } else {
      this.apiService.reserve_book(this.stateService.user.username, reservable[0].barcode)
        .then(() => {
          this.messageService.messages.push(
            new Message('reserve success, You need to go to library and borrow this book as fast as possible', 'success'));
        });
    }
  }

  submit_edit_metabook() {
    this.stateService.only('librarian');
    this.apiService.update_meta_book(this.showMetaBook)
      .then(() => {
        this.showMetaBook = this.metaBook;
        this.modalService.dismissAll();
      });
  }

  visualize(books: Array<Book>) {
    return books.filter(value => !(value.deleted));
  }

  private get_book_info(isbn: string) {
    this.apiService.get_meta_book(isbn)
      .then(res => {
        this.metaBook = res;
        if (this.login === 'librarian') {
          Object.assign(this.showMetaBook, this.metaBook);
        }
      }).catch(error => {
        console.error(error);
        this.stateService.back_home()
          .then(() => this.messageService.messages.push(new Message('no such a book', 'danger')));
      });

    this.apiService.get_books(isbn).then(res => this.books = res);
  }

  get_date_time(time: string): string {
    const date = new Date(time);
    return this.login === 'librarian' ? date.toLocaleString() : date.toLocaleDateString();
  }
}
