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
  books: Book[];
  selectedbook: Book;
  UserName = 'WYJ';
  search_text: string;

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(Books => this.books = Books);
  }
  onSelect(b: Book): void {
    this.selectedbook = b;
  }
  onClick(type: string): void {
    console.log('start search: "' + this.search_text + '" by ' + type);
    this.getBooks();
  }
  closeAlert(): void {
    this.selectedbook = null;
  }
}
