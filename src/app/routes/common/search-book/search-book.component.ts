import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../utils/api.service';
import {MetaBook} from '../../../utils/DataStructs/MetaBook';
import {StateService} from "../../../utils/state.service";

@Component({
  selector: 'app-librarian-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {
  books: Array<MetaBook>;
  search_text: string;

  constructor(
    private stateService: StateService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.stateService.only_rl();
    // document.body.style.background = '#252525';
  }

  search_book(): void {
    // this.search_type = type;
    console.log('start search: "' + this.search_text);
    this.apiService.search_meta_book(this.search_text).then(
      res => {
        console.log(res);
        this.books = res;
      }
    );
  }

  // noinspection JSMethodCanBeStatic
  format_book (book: MetaBook): string {
    let res = '';
    for (let x in book) {
      if (book.hasOwnProperty(x)) {
        res += `${x}: ${book[x]}\n`
      }
    }
    return res;
  }

}
