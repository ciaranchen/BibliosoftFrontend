import { Component, OnInit } from '@angular/core';
import { Book } from '../../../utils/DataStructs/book';
// import { BookService } from '../../../utils/book.service';
import {ApiService} from "../../../utils/api.service";

@Component({
  selector: 'app-librarian-search-book',
  templateUrl: './librarian-search-book.component.html',
  styleUrls: ['./librarian-search-book.component.css']
})
export class LibrarianSearchBookComponent implements OnInit {
  // x: Book = {
  //   title: '考研数学复习全书',
  //   ISBN: '978-7-5150-2030-3',
  //   author: '李永乐',
  //   date: '2017.12',
  //   summary: '数学辅导书'
  // };
  books: Book[] = [];
  selectedbook: Book;
  // bookbyISBN: Book;
  UserName = 'WYJ';
  search_text: string;
  // search_type = 'Title';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    document.body.style.background = '#252525';
  }


  // getBook(ISBN: string): void {
  //   // console.log(`this.bookbyISBN.author,this.bookbyISBN.date,this.bookbyISBN.ISBN`);
  //   this.bookService.getBook(ISBN).subscribe(
  //     Books => this.books = Books
  //   );
  //   // this.books.push(this.bookbyISBN);
  //   // console.log(this.bookbyISBN.author,this.bookbyISBN.date,this.bookbyISBN.ISBN);
  // }

  getBooks(term: string): void {
    // this.bookService.getBooks(term, type).subscribe(Books => this.books = Books);
    this.apiService.search(term)
    .then( res => {  console.log(res); })
    .catch( err => { console.error(err); });
    // this.doubanService.searchISBN(this.isbn)
    // .then(res => { // load success from douban
    //   this.fromDouban = true;
    //   this.book = res;
    // }).catch(err => { // not exists in douban
    //   this.fromDouban = false;
    //   closeTab();
    //   console.error(err);
    // });
  }

  onSelect(b: Book): void {
    this.selectedbook = b;
  }
  onClick(): void {
    // this.search_type = type;
    console.log('start search: "' + this.search_text);
    this.getBooks(this.search_text);
    // if (this.search_type === 'ISBN') {
    //   // this.getBook(this.search_text);
    // } else {
    //   this.getBooks(this.search_text, this.search_type);
    // }
  }
  // updateType(type: string) {
  //   this.search_type = type;
  // }

  closeAlert(): void {
    this.selectedbook = null;
  }
}
