import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {MetaBook} from '../../../utils/DataStructs/MetaBook';
import {ApiService} from '../../../utils/api.service';
import {Book} from '../../../utils/DataStructs/Book';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {StateService} from "../../../utils/state.service";

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

  showMetaBook: MetaBook;

  constructor(
    private modalService: NgbModal,
    private stateService: StateService,
    private activateRoute: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // to get metaBook information from backend
    this.isbn = this.activateRoute.snapshot.paramMap.get('ISBN');
    this.apiService.get_meta_book(this.isbn)
      .then(res => {this.metaBook = res; })
      .catch(error => {
        console.error('404');
        console.error(error);
        this.stateService.back_home();
      }
    );
    this.apiService.get_books(this.isbn).then(
      res => {
        this.books = res;
      }
    );
    this.login = localStorage.getItem('login');

    // this.routerRedirect.only2('librarian', 'reader');
    if (this.login === 'librarian') {
      Object.assign(this.showMetaBook, this.metaBook);
    }
  }

  edit_location($event: Event) {
    const temp = $event.srcElement;
    const button = temp.tagName.toLowerCase() === 'i' ? temp.parentElement : temp;
    const tr = button.parentElement.parentElement;
    // console.log(tr);
    const barcode = tr.childNodes[1].textContent;
    // console.log(barcode);
    const location = tr.childNodes[2].textContent;
    const newLocation = prompt('new location?', location);
    if (!newLocation) {
      return;
    }
    let i: number = undefined;
    this.books.forEach((book, index) => {
      if (book.barcode.toString() === barcode.toString()) {
        i = index;
      }
    });

    let editBook: Book = undefined;
    Object.assign(this.books[i], editBook);
    editBook.location = newLocation;
    this.apiService.update_book(editBook).then(
      res => {
        if (res) {
          this.books[i].location = newLocation;
        } else {
          console.error('error');
        }
      }
    );
  }

  remove_book($event: Event) {
    const temp = $event.srcElement;
    const button = temp.tagName.toLowerCase() === 'i' ? temp.parentElement : temp;
    const tr = button.parentElement.parentElement;
    // console.log(tr);
    const barcode = tr.childNodes[1].textContent;

    let i: number;

    this.books.forEach((book, index) => {
      if (book.barcode.toString() === barcode.toString()) {
        i = index;
      }
    });

    this.apiService.delete_book(barcode).then(
      res => {
        if (res) {
          delete this.books[i];
        } else {
          console.error('error');
        }
      }
    );
  }

  disable_book() {
    return this.books.findIndex(val => val.available === true) === -1;
  }

  reserve_book() {
    this.stateService.only('reader');
    // this.apiService.reserve_book(stateService.user.username, this.isbn);
  }

  delete_meta_book() {
    this.stateService.only('librarian');
    this.apiService.delete_meta_book(this.metaBook.isbn)
      .then(() => {
        // todo: show message
        console.log('delete success!');
        this.stateService.back_home();
      });
  }

  submit_edit_meta_book() {
    this.stateService.only('librarian');
    this.apiService.update_meta_book(this.showMetaBook)
      .then(() => {
        this.showMetaBook = this.metaBook;
      });
  }
}
