import {Component, Input, OnInit} from '@angular/core';
import {Plotly} from "angular-plotly.js/src/app/plotly/plotly.service";
import {DateIncome} from "../../utils/DataStructs/DateIncome";

@Component({
  selector: 'app-plotly-income-multi-lines',
  templateUrl: './plotly-income-multi-lines.component.html',
  styleUrls: ['./plotly-income-multi-lines.component.css']
})
export class PlotlyIncomeMultiLinesComponent implements OnInit {

  @Input()
  set dataInput(data: Array<DateIncome>) {
    this.data = this.get_traces(data);
    console.log(this.data);
  }

  @Input() start: Date;
  @Input() end: Date;

  data: Plotly.Data[] = [];
  layout: Partial<Plotly.Layout> = {
    showlegend: true,
    title: 'Library Income',
    // width: 1080, height: 960,
    xaxis: {
      autorange: true,
      range: [
        this.start,
        this.end
      ],
      title: 'Time',
      type: Date
    },
    yaxis: {
      autorange: true,
      title: 'Money',
      type: Number
    }
  };

  constructor() {}

  private get_traces(formatData: Array<DateIncome>): Plotly.Data[] {
    const dates = formatData.map(value => value.date);
    const fines = formatData.map(value => value.fine);
    const deposits = formatData.map(value => value.deposit);
    return [{
      x: dates,
      y: fines,
      name: 'fine'
    }, {
      x: dates,
      y: deposits,
      name: 'deposit'
    }];
  }

  ngOnInit() {}
}
