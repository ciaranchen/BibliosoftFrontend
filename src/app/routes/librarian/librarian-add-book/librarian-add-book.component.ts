import {Component, OnInit} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as JsBarcode from 'jsbarcode';

import {MetaBook} from "../../../utils/DataStructs/MetaBook";
import {ApiService} from "../../../utils/api.service";
import {Book} from "../../../utils/DataStructs/Book";
import { DoubanService } from '../../../utils/douban.service';
import {StateService} from "../../../utils/state.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookLocation} from "../../../utils/DataStructs/BookLocation";

@Component({
  selector: 'app-librarian-add-book',
  templateUrl: './librarian-add-book.component.html',
  styleUrls: ['./librarian-add-book.component.css'],
  providers: [DoubanService, NgbModalConfig, NgbModal]
})
export class LibrarianAddBookComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private doubanService: DoubanService,
    private apiService: ApiService,
    public modalService: NgbModal
  ) { }

  ngOnInit() {
    this.stateService.only('librarian');
  }

  returnValues: Array<Book>;

  book: MetaBook = new MetaBook('', '', '', '');
  isbn: string;
  cacheISBN: string;
  bookNumber = 1;
  location: BookLocation = new BookLocation();

  loadingWords: string;
  loadingResult: string = '';

  firstFormGroup: FormGroup = this.formBuilder.group({
    isbnCtrl: ['', [
      Validators.required,
      Validators.pattern('^-?((978[\\--– ])?[0-9][0-9\\--– ]{10}[\\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])$')]]
  });
  secondFormGroup: FormGroup = this.formBuilder.group({
    titleCtrl: [{}, Validators.required], subtitleCtrl: [{}],
    authorCtrl: [{}, Validators.required], publisherCtrl: [{}, Validators.required],
    coverCtrl: [{}], priceCtrl: [{}],
    keywordCtrl: [{}], publishYearCtrl: [{}], pagesCtrl: [{}],
    summaryCtrl: [{}],
  });
  thirdFormGroup: FormGroup = this.formBuilder.group({
    numberCtrl: ['', [Validators.required, Validators.pattern('^([1-9][0-9]*)$')]],
    roomCtrl: ['', Validators.required], shelfCtrl: ['', Validators.required], levelCtrl: ['', Validators.required]
  });

/**
  * isbnExist fromDouban  desc
  * true      Any         成功从自己数据库中找到对应isbn的meta book
  * false     true        自己数据库中meta book不存在，但是从豆瓣中加载到了元数据
  * false     false       自己数据库中meta book不存在，也未从豆瓣中加载数据，仅为用户自己输入。
  **/
  isbnExist = true;
  fromDouban = false;

  private _check_blur() {
    this.apiService.has_meta_book(this.isbn)
      .then((res) => {
        if (res) {
          this.isbnExist = true;
          this.loadingWords = 'isbn exists in database, you can add it directly!';
        } else {
          this.isbnExist = false;
          this.loadingWords = 'isbn not exists! Search book info from Douban...';
          this.doubanService.searchISBN(this.isbn)
            .then(res => { // load success from douban
              this.loadingResult = 'Successfully load from Douban!';
              this.book = res;
              // console.log(res);
            }).catch(err => { // not exists in douban
              this.loadingResult = 'It seems this isbn is not a book isbn. Retype the ISBN or input the book information manually';
              this.fromDouban = false;
              this.book.isbn = this.isbn;
              console.error(err);
            });
        }
      });
  }

  check_isbn() {
    if (this.cacheISBN !== this.isbn) {
      // isbn is changed
      this.cacheISBN = this.isbn;
      this._check_blur();
    }
  }

  submitAddBook() {
    this.apiService.add_book(this.isbn, this.bookNumber, this.location, this.isbnExist? undefined: this.book)
      .then((res) => {
        this.returnValues = res;
        setTimeout(() => JsBarcode('.barcode').init(), 1000);
      });
  }

  private _generate_random_isbn(bitNum: number) {
    const str = Math.random().toString().slice(2);
    return str.length >= bitNum ? str.slice(0, bitNum) : str + this._generate_random_isbn(bitNum - str.length);
  }

  generate_random_isbn(bitNum: number = 10, defaultHead: string = '-978'): void {
    // -978 as the isbn head;
    bitNum = bitNum > 10 ? 10 : bitNum;
    const strTail = this._generate_random_isbn(bitNum);
    const isbn = defaultHead + strTail;
    this.apiService.has_meta_book(isbn)
      .then(res => {
        if (res) {
          // generate again
          this.generate_random_isbn(bitNum, defaultHead);
        } else {
          this.doubanService.searchISBN(isbn)
            .then(() => {
              // generate again
              this.generate_random_isbn(bitNum, defaultHead);
            }).catch(() => {
              this.isbn = isbn;
            });
        }
      });
  }
}
