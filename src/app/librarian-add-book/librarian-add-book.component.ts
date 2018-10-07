import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DoubanService } from '../utils/doubanService';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as JsBarcode from 'jsbarcode';
import { apiServer } from '../api-server';

const show_time = 5000;

class AddBookForm {
  public ISBN: string;
  // default book number is 1
  public bookNumber: number = 1;

  private location: string;

  private title: string;
  private subtitle: string;
  private author: string;
  private publisher: string;
  private summary: string;
  public fromDouban: boolean = false;

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
    if (exist) {
      return senddata({
        isbn: this.ISBN,
        count: this.bookNumber,
        location: this.location
      });
    } else {
      return senddata(this);
    }
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

  private barcodes: Array<string>;
  private data: AddBookForm = new AddBookForm();

  private cacheISBN: string;
  
  private floor: string;
  private room: string;
  private shelf: string;

  private loadingWords: string;

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
      .get(`${apiServer.get_url()}/has_meta_book?isbn=${this.data.ISBN}`)
      .subscribe(
        // isbn exists in our database
        res => {
          this.isbnExist = true;
          this.loadingWords = 'isbn exists in database, you can add it directly!'
          this.http.put(`${apiServer.get_url()}/add_book`, {
            isbn: this.data.ISBN,
            count: this.data.bookNumber
          }).subscribe(
            val => console.log(val),
            err => console.error(err)
          );
        },
        // isbn not exist in our database
        error => {
          this.isbnExist = false;
          this.loadingWords = 'isbn not exists! Search book info from Douban';
          // search it in douban;
          this.doubanapi.searchISBN(this.data.ISBN)
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
    if (this.cacheISBN !== this.data.ISBN) {
      // isbn is changed
      this.modalService.open(content);
      this.loadingWords = 'Loading ...';
      this.cacheISBN = this.data.ISBN;
      this.check_isbn(dismiss);
    }
  }

  submitAddBook(modal) {
    console.log('submit.');
    // load location into data;
    this.data.getLocation([this.floor, this.room, this.shelf]);
    // how to use the api
    const senddata = (data) => {
      return this.http.put(`${apiServer.get_url()}/add_book`, data);
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
    )
  }

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
