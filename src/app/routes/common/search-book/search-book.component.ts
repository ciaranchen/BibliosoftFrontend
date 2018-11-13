import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../utils/api.service';
import {MetaBook} from '../../../utils/DataStructs/MetaBook';
import {StateService} from '../../../utils/state.service';
import {MatPaginator, MatTableDataSource, MatChipInputEvent} from '@angular/material';
import { Category } from 'src/app/utils/DataStructs/Category';

@Component({
  selector: 'app-librarian-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {
  books: Array<MetaBook>;
  search_text = '';
  searched = false;

  displayedColumns = ['title', 'isbn', 'author', 'publisher'];
  dataSource: MatTableDataSource<MetaBook> = new MatTableDataSource<MetaBook>();

  categories: Category[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private stateService: StateService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.stateService.only_rl();
    this.dataSource.paginator = this.paginator;
    // this.apiService.get_all_category()
    //   .then(res => categories = res);
  }

  category_book(category: string) {
    // this.apiService.get_category(category)
    //   .then(res => {
    //     this.searched = true;
    //     this.update_books(res);
    //   });
  }

  search_book(): void {
    // this.search_type = type;
    const search_text = this.search_text.replace(' ', '_');
    console.log('startDate search: "' + search_text);
    this.apiService.search_meta_book(search_text)
      .then(res => {
        this.searched = true;
        // console.log(res);
        this.update_books(res);
      });
  }

  private update_books(books: MetaBook[]) {
    this.books = books;
    this.dataSource.data = books;
    // wait a second
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 1000);
  }

  // noinspection JSMethodCanBeStatic
  format_book (book: MetaBook): string {
    let res = '';
    for (const x in book) {
      if (book.hasOwnProperty(x)) {
        res += `${x}: ${book[x]}\n`;
      }
    }
    return res;
  }

  add_category(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.categories.push({msg: value.trim()});
      // todo: add category
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove_category(category: Category): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
      // todo: remove category
    }
  }
}
