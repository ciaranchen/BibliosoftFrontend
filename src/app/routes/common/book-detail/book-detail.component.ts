import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {MetaBook} from '../../../utils/DataStructs/MetaBook';
import {ApiService} from '../../../utils/api.service';
import {Book} from '../../../utils/DataStructs/Book';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {StateService} from "../../../utils/state.service";
import {Message, MessageService} from "../../../utils/message.service";
import * as JsBarcode from 'jsbarcode';

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
        })
    } else {
      this.isbn = this.activateRoute.snapshot.paramMap.get('ISBN');
      this.get_book_info(this.isbn);
    }
  }

  edit_location($event: Event) {
    const tr = this.get_tr($event);
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
    const canvasElem = window.document.createElement('canvas');
    JsBarcode(canvasElem, barcode);
    const a = window.document.createElement('a');
    a.href = canvasElem.toDataURL('image/png');  // 将画布内的信息导出为png图片数据
    a.download = `code_${barcode}`;
    a.click();
  }

  disable_reserve() {
    return this.books.findIndex(val => val.available === true) === -1;
  }

  reserve_book() {
    this.stateService.only('reader');
    // todo: reserve book
    // this.apiService.reserve_book(stateService.user.username, this.isbn);
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
}
