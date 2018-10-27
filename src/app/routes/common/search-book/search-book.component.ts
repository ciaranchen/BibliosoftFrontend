import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../utils/api.service';
import {MetaBook} from '../../../utils/DataStructs/MetaBook';
import {StateService} from "../../../utils/state.service";
import {MatPaginator, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-librarian-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {
  books: Array<MetaBook>;
  search_text: string = '';
  searched = false;

  displayedColumns = ["title", 'isbn', 'author', 'publisher'];
  dataSource: MatTableDataSource<MetaBook> = new MatTableDataSource<MetaBook>();

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private stateService: StateService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.stateService.only_rl();
    // this.dataSource.paginator = this.paginator;
  }

  search_book(): void {
    // this.search_type = type;
    const search_text = this.search_text.replace(' ', '_');
    console.log('start search: "' + search_text);
    this.apiService.search_meta_book(search_text).then(
      res => {
        this.searched = true;
        console.log(res);
        this.books = res;
        this.dataSource.data = res;

        // this.dataSource.paginator.lastPage();
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
