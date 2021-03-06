import {Component, Input, OnInit} from '@angular/core';
import {Income} from '../../utils/DataStructs/Income';

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.css']
})
export class IncomeDetailComponent implements OnInit {
  @Input() data: Array<Income>;
  @Input() role: number;

  constructor() { }

  ngOnInit() {}

  link_address(x: Income): string {
    return this.role === 1 ? `/borrow/${x.borrow_id}` : `/librarian/reader/profile/${x.reader_id}`;
  }

  get_time(x: string) {
    return (new Date(x)).toLocaleTimeString();
  }
}
