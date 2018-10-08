import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

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
  books: Book[]=[];
  selectedbook: Book;
  bookbyISBN:Book;
  UserName = 'WYJ';
  search_text: string;
  search_type: string;

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }
  
// 
  getBook(ISBN: string): void {
    // console.log(`this.bookbyISBN.author,this.bookbyISBN.date,this.bookbyISBN.ISBN`);
    this.bookService.getBook(ISBN).subscribe(Books => this.books=Books);
    // this.books.push(this.bookbyISBN);
    // console.log(this.bookbyISBN.author,this.bookbyISBN.date,this.bookbyISBN.ISBN);
  }
  // 

  getBooks(term: string,type: string): void {
    this.bookService.getBooks(term,type).subscribe(Books => this.books = Books);
  }
  onSelect(b: Book): void {
    this.selectedbook = b;
  }
  onClick(type: string): void {
    console.log('start search: "' + this.search_text + '" by ' + type);

// 
    if(type=="ISBN"){;
      this.getBook(this.search_text);
    }


    else 
    this.getBooks(this.search_text,type);
  }
  closeAlert(): void {
    this.selectedbook = null;
  }
}
