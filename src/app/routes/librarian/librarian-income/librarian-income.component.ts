import { Component, OnInit } from '@angular/core';
import {StateService} from '../../../utils/state.service';
import {ApiService} from '../../../utils/api.service';
import {DateIncome} from '../../../utils/DataStructs/DateIncome';
import {DayIncome} from '../../../utils/DataStructs/DayIncome';
import {TotalIncome} from '../../../utils/DataStructs/TotalIncome';
import {FormControl} from '@angular/forms';
import {Income} from '../../../utils/DataStructs/Income';

@Component({
  selector: 'app-librarian-home',
  templateUrl: './librarian-income.component.html',
  styleUrls: ['./librarian-income.component.css']
})
export class LibrarianIncomeComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  today: Date;

  data: Array<DateIncome> = [];
  totalIncome: TotalIncome;

  startCtrl: FormControl;
  endCtrl: FormControl;

  constructor(
    private stateService: StateService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.stateService.only('librarian');
    this.apiService.total_income()
      .then(res => {
        this.totalIncome = res;
      });

    this.today = new Date();
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    this.startDate = sevenDaysAgo;
    this.endDate = now;
    // set form control
    this.startCtrl = new FormControl({value: this.startDate, disabled: true});
    this.startCtrl.valueChanges.subscribe(value => {
      this.startDate = value;
      this.update_data();
    });
    this.endCtrl = new FormControl({value: this.endDate, disabled: true});
    this.endCtrl.valueChanges.subscribe(value => {
      this.endDate = value;
      this.update_data();
    });

    this.update_data();
  }

  private update_data() {
    this.apiService.get_incomes(this.startDate, this.endDate)
      .then(res => this.data = this.format_data(res));
  }

  format_data(incomes: Array<DayIncome>): Array<DateIncome> {
    return this.datesBetween(this.startDate, this.endDate).map(value => {
      const dayData = incomes.filter(value1 => value1.this_day === ApiService.date2string(value));
      return dayData.length === 0 ? new DateIncome(value) :
        new DateIncome(value, dayData[0].fine_amount, dayData[0].deposit_amount, dayData[0].incomes);
    });
  }

  private datesBetween(startDate: Date, endDate: Date): Array<Date> {
    let currentDate = startDate;
    const dates = [],
      addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

  earn_money_filter(): Array<DateIncome> {
    return this.data.filter(value => value.deposit + value.fine !== 0);
  }

  filter_fines(incomes: Array<Income>) {
    return incomes.filter(value => value.type === 1);
  }

  filter_deposit(incomes: Array<Income>) {
    return incomes.filter(value => value.type === 2);
  }
}
