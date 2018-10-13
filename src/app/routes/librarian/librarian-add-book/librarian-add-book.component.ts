import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as JsBarcode from 'jsbarcode';

import {MetaBook} from "../../../utils/DataStructs/MetaBook";
import {ApiService} from "../../../utils/api.service";
import {AddBookRet} from "../../../utils/DataStructs/AddBookRet";
import { DoubanService } from '../../../utils/douban.service';

const show_time = 5000;

@Component({
  selector: 'app-librarian-add-book',
  templateUrl: './librarian-add-book.component.html',
  styleUrls: ['./librarian-add-book.component.css'],
  providers: [DoubanService, NgbModalConfig, NgbModal]
})
export class LibrarianAddBookComponent {

  constructor(
    private doubanService: DoubanService,
    private apiService: ApiService,
    private modalService: NgbModal
  ) { }

  returnValues: Array<AddBookRet>;

  book: MetaBook = new MetaBook('', '', '', '');
  isbn: string;
  bookNumber = 1;

  floor: string;
  room: string;
  shelf: string;

  loadingWords: string;
  cacheISBN: string;

/**
  * isbnExist fromDouban  desc
  * true      Any         成功从自己数据库中找到对应isbn的meta book
  * false     true        自己数据库中meta book不存在，但是从豆瓣中加载到了元数据
  * false     false       自己数据库中meta book不存在，也未从豆瓣中加载数据，仅为用户自己输入。
  **/
  isbnExist = true;
  fromDouban = false;

  buttonDisable = true;

  check_isbn(closeTab) {
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
              this.fromDouban = true;
              this.book = res;
            }).catch(err => { // not exists in douban
              this.fromDouban = false;
              closeTab();
              console.error(err);
            });
        }
      }).then(() => { // after complete all
        setTimeout(closeTab, show_time);
        this.buttonDisable = false;
      });
  }

  isbnBlur(content) {
    const dismiss = () => { // close the modal
      this.modalService.dismissAll(content);
    };
    if (this.cacheISBN !== this.isbn) {
      // isbn is changed
      this.modalService.open(content);
      this.loadingWords = 'Loading ...';
      this.cacheISBN = this.isbn;
      this.check_isbn(dismiss);
    }
  }

  submitAddBook(modal) {
    // console.log('submit.');
    // load location into data;
    if (! (this.floor && this.room && this.shelf)) {
      // one is empty
      // todo: sure it?
    }
    const location = [this.floor, this.room, this.shelf].map((data) => data.replace('-', '_')).join('-');
    let service;
    if (this.isbnExist) {
      // service = this.apiService.add_book('7101003044', 1, '1-2-3')
      service = this.apiService.add_book(this.isbn, this.bookNumber, location);
    } else {
      service = this.apiService.add_book(this.isbn, this.bookNumber, location, this.book);
    }
    service.then((res) => {
      // console.log(res);
      this.returnValues = res;
      this.modalService.open(modal);
    });
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
