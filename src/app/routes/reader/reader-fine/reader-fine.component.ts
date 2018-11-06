import {Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../../../utils/api.service';
import {StateService} from '../../../utils/state.service';
import {Borrow} from '../../../utils/DataStructs/Borrow';
import {ActivatedRoute} from '@angular/router';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-reader-fine',
  templateUrl: './reader-fine.component.html',
  styleUrls: ['./reader-fine.component.css']
})
export class ReaderFineComponent implements OnInit {

  readerId: string;

  displayedColumns = ['librarian', 'barcode', 'fine', 'borrow', 'return'];
  fineData: MatTableDataSource<Borrow> = new MatTableDataSource<Borrow>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {  }

  ngOnInit() {
    this.stateService.only_rl();

    if (this.stateService.role === 'reader') {
      this.readerId = this.stateService.user.username;
    } else {
      this.activatedRoute.params
        .subscribe(value => this.readerId = value['reader']);
    }

    this.apiService.get_fines(this.readerId)
      .then(res => {
        this.fineData.data = res;
        this.fineData.sort = this.sort;
      }).catch(err => {
        console.error(err);
      });
  }

  date_range(): string {
    const dates = this.fineData.data.map(value => (new Date(value.borrow_time)));
    const maxDate = dates.reduce((p, c) => p > c ? p : c);
    const minDate = dates.reduce((p, c) => p < c ? p : c);
    return `from ${minDate.toLocaleDateString()} to ${maxDate.toLocaleDateString()}`;
  }

  total_fine(): string {
    return `total fine: ${this.fineData.data.map(value => value.fine).reduce((p, c) => p + c)} yuan`;
  }

  total_not_return(): string {
    return `not return: ${this.fineData.data.filter(value => !(value.return_time)).length}`;
  }

  get_date_time(borrow_time: number): string {
    if (!borrow_time) {
      return null;
    }
    const date = new Date(borrow_time);
    return date.toLocaleString();
  }
}
