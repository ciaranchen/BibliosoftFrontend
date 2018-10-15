import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {MetaBook} from "../../../utils/DataStructs/MetaBook";
import {ApiService} from "../../../utils/api.service";
import {Book} from "../../../utils/DataStructs/Book";

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

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // to get metaBook information from backend
    this.isbn = this.activateRoute.snapshot.paramMap.get('ISBN');
    this.apiService.get_meta_book(this.isbn).then(
      res => {
        this.metaBook = res;
        // todo: deal with metaBook's desc_html
      }
    ).catch(
      error => {
        if (error) {
          console.error('404');
          console.error(error);
          // this.router.navigate(['']);
        }
      }
    );
    this.apiService.get_books(this.isbn).then(
      res => {
        this.books = res;
      }
    );

    // check login
    const login = localStorage.getItem('login');
    if (login) {
      this.login = login;
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
    let i: number;
    this.books.forEach((book, index) => {
      if (book.barcode.toString() === barcode.toString()) {
        i = index;
      }
    });

    let editBook: Book;
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
}
