import { Component, OnInit } from '@angular/core';
import {StateService} from "../../../utils/state.service";
import {ApiService} from "../../../utils/api.service";
import {DateIncomeData} from "../../../utils/DataStructs/DateIncomeData";
import {DateIncome} from "../../../utils/DataStructs/DateIncome";
import {TotalIncome} from "../../../utils/DataStructs/TotalIncome";

@Component({
  selector: 'app-librarian-home',
  templateUrl: './librarian-income.component.html',
  styleUrls: ['./librarian-income.component.css']
})
export class LibrarianIncomeComponent implements OnInit {

  start: Date;
  end: Date;
  data: Array<DateIncomeData> = [];
  totalIncome: TotalIncome;

  constructor(
    private stateService: StateService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    // this.stateService.only('librarian');
    // todo: get library fine record

    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    this.start = sevenDaysAgo;
    this.end = now;

    this.apiService.get_incomes(sevenDaysAgo, now)
      .then(res => {
        console.log(res);
        this.data = this.format_data(res);
        console.log(this.data);
      });
  }

  format_data(incomes: Array<DateIncome>): Array<DateIncomeData> {
    return this.datesBetween(this.start, this.end).map(value => {
      const dayData = incomes.filter(value1 => value1.this_day === ApiService.date2string(value));
      return dayData.length === 0 ? new DateIncomeData(value) :
        new DateIncomeData(value, dayData[0].fine_amount, dayData[0].deposit_amount);
    });
  }

  private datesBetween(startDate: Date, endDate: Date): Array<Date> {
    let dates = [],
      currentDate = startDate,
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
}
