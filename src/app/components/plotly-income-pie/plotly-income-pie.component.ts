import {Component, Input, OnInit} from '@angular/core';
import {DateIncome} from "../../utils/DataStructs/DateIncome";
import {Plotly} from "angular-plotly.js/src/app/plotly/plotly.service";

@Component({
  selector: 'app-plotly-income-pie',
  templateUrl: './plotly-income-pie.component.html',
  styleUrls: ['./plotly-income-pie.component.css']
})
export class PlotlyIncomePieComponent implements OnInit {

  @Input()
  set dataInput(incomeData: DateIncome) {
    this.data = this.income2data(incomeData);
    this.layout = {
      title: incomeData.date.toLocaleDateString()
    };
  }

  data: Plotly.Data[] = [];
  layout: Partial<Plotly.Layout> = {};


  constructor() { }

  ngOnInit() {
  }

  private income2data(incomeData: DateIncome): Plotly.Data[] {
    return [{
      values: [incomeData.fine, incomeData.deposit],
      labels: ['fine', 'deposit'],
      type: 'pie'
    }];
  }
}
