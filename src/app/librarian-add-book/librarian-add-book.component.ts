import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DoubanService } from '../utils/doubanService';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as JsBarcode from 'jsbarcode';

const show_time = 5000;

class AddBookForm {
  public ISBN: string;
  public loaded: boolean;

  private title: string;
  private subtitle: string;
  private author: string;
  private publisher: string;
  private summary: string;
  private bookNumber: number;

  constructor(num: number, loaded: boolean) {
    this.bookNumber = num;
    this.loaded = loaded;
  }

  // todo: pretty it.
  loadData(args) {
    const {title, author, publisher, subtitle= '', summary= '' } = args;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.subtitle = subtitle;
    this.summary = summary;
  }
}

@Component({
  selector: 'app-librarian-add-book',
  templateUrl: './librarian-add-book.component.html',
  styleUrls: ['./librarian-add-book.component.css'],
  providers: [DoubanService, NgbModalConfig, NgbModal]
})
export class LibrarianAddBookComponent implements OnInit {

  constructor(
    private http: HttpClient, private doubanapi: DoubanService,
    private modalService: NgbModal
  ) { }

  data = new AddBookForm(1, false);

  cacheISBN: string;
  loadWords: string;
  loadSucces = false;
  results: object;

  ngOnInit() {
  }

  search_douban(isbn: string, closeTab: any) {
    this.doubanapi.searchISBN(isbn)
      .then(res => {
        this.loadWords = `sucessful load from douban!`;
        this.data.loadData(res);
        this.loadSucces = true;
        setTimeout(closeTab, show_time);
      })
      .catch(err => {
        console.log(err);
        this.loadWords = `load error: ${err.message}`;
        this.loadSucces = false;
        setTimeout(closeTab, show_time);
      });
  }

  load(content) {
    const dismiss = () => {
      this.modalService.dismissAll(content);
      this.data.loaded = true;
    };
    if (this.cacheISBN !== this.data.ISBN) {
      this.modalService.open(content);
      this.loadWords = 'Loading ...';
      this.cacheISBN = this.data.ISBN;
      console.log(this.data.ISBN);
      this.search_douban(this.data.ISBN, dismiss);
    }
  }

  submitAddBook(modal) {
    this.http.post('', this.data)
      .subscribe((res) => {
        this.results = res;
        this.modalService.open(modal);
        console.log(res);
      });
  }

  downloadBarcode(event: Event) {
    const target = event.srcElement;
    const barcode = target.innerHTML;
    console.log(barcode);

    const canvasElem = window.document.createElement('canvas');
    JsBarcode(canvasElem, barcode);
    const a = window.document.createElement('a');
    a.href = canvasElem.toDataURL('image/png');  // 将画布内的信息导出为png图片数据
    a.download = `code_${barcode}`;
    a.click();
  }
}
