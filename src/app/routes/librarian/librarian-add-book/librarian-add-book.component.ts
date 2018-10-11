import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DoubanService } from '../../../utils/douban.service';


import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as JsBarcode from 'jsbarcode';
import { backendServer } from '../../../utils/backendServer';

const show_time = 5000;

class AddBookForm {
  isbn: string;
  // default book number is 1
  bookNumber = 1;

  location: string;

  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  summary: string;

  // default is not loaded from Douban
  fromDouban = false;

  constructor() { }

  // todo: pretty it.
  loadData(args) {
    this.fromDouban = true;
    const {title, author, publisher, subtitle= '', summary= '' } = args;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.subtitle = subtitle;
    this.summary = summary;
  }

  getLocation(locates: Array<string>): void {
    this.location = locates.map((data) => data.replace('-', '_')).join('-');
  }

  submit(exist: boolean, senddata: Function) {
    // todo: pretty it
    const body = new URLSearchParams();
    body.set('isbn', this.isbn);
    body.set('count', this.bookNumber.toString());
    body.set('location', this.location);
    if (!exist) {
      body.set('title', this.title);
      body.set('author', this.author);
      body.set('subtitle', this.subtitle);
      body.set('publisher', this.publisher);
      body.set('summary', this.summary);
    }
    return senddata(body.toString());
  }
}

@Component({
  selector: 'app-librarian-add-book',
  templateUrl: './librarian-add-book.component.html',
  styleUrls: ['./librarian-add-book.component.css'],
  providers: [DoubanService, NgbModalConfig, NgbModal]
})
export class LibrarianAddBookComponent {

  constructor(
    private http: HttpClient, private doubanapi: DoubanService,
    private modalService: NgbModal
  ) { }

  barcodes: Array<string>;
  data: AddBookForm = new AddBookForm();

  cacheISBN: string;

  floor: string;
  room: string;
  shelf: string;

  loadingWords: string;

/**
  * isbnExist loadDouban  desc
  * true      Any         成功从自己数据库中找到对应isbn的meta book
  * false     true        自己数据库中meta book不存在，但是从豆瓣中加载到了元数据
  * false     false       自己数据库中meta book不存在，也未从豆瓣中加载数据，仅为用户自己输入。
  **/
  isbnExist = true;
  // loadDouban = false;

  buttonDisable = false;

  check_isbn(closeTab: any) {
    this.http
      // search if this isbn in database
      .get(`${backendServer.get_url()}/has_meta_book?isbn=${this.data.isbn}`)
      .subscribe(
        // isbn exists in our database
        res => {
          this.isbnExist = true;
          this.loadingWords = 'isbn exists in database, you can add it directly!';
        },
        // isbn not exist in our database
        error => {
          console.log(error);
          this.isbnExist = false;
          this.loadingWords = 'isbn not exists! Search book info from Douban';
          // search it in douban;
          this.doubanapi.searchISBN(this.data.isbn)
            .then(res => { // load success from douban
              this.loadingWords = `sucessful load from Douban!`;
              this.data.loadData(res);
            })
            .catch(err => { // not exists in douban
              this.loadingWords = `load error: ${err.message}`;
              console.error(err);
            });
        },
        // close the tab at last.
        () => {
          setTimeout(closeTab, show_time);
          this.buttonDisable = true;
        }
      );
  }

  isbnBlur(content) {
    const dismiss = () => {
      // close the modal
      this.modalService.dismissAll(content);
    };
    if (this.cacheISBN !== this.data.isbn) {
      // isbn is changed
      this.modalService.open(content);
      this.loadingWords = 'Loading ...';
      this.cacheISBN = this.data.isbn;
      this.check_isbn(dismiss);
    }
  }

  submitAddBook(modal) {
    console.log('submit.');
    // load location into data;
    this.data.getLocation([this.floor, this.room, this.shelf]);
    // how to use the api
    const senddata = (data) => {
      return this.http.put(`${backendServer.get_url()}/add_book`, data, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      });
    };
    // send request and open the result modal
    this.data.submit(this.isbnExist, senddata).subscribe(
      (res) => {
        this.barcodes = res;
        this.modalService.open(modal);
        console.log(res);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  // noinspection JSMethodCanBeStatic
  downloadBarcode(event: Event) {
    const target = event.srcElement;
    const barcode = target.innerHTML;
    // console.log(barcode);

    const canvasElem = window.document.createElement('canvas');
    JsBarcode(canvasElem, barcode);
    const a = window.document.createElement('a');
    a.href = canvasElem.toDataURL('image/png');  // 将画布内的信息导出为png图片数据
    a.download = `code_${barcode}`;
    a.click();
  }
}
