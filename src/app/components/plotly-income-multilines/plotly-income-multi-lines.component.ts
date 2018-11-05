import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DateIncome} from "../../utils/DataStructs/DateIncome";
import {PlotlyService} from "../../utils/plotly.service";

@Component({
  selector: 'app-plotly-income-multi-lines',
  templateUrl: './plotly-income-multi-lines.component.html',
  styleUrls: ['./plotly-income-multi-lines.component.css']
})
export class PlotlyIncomeMultiLinesComponent {
  @ViewChild('lines') element: ElementRef;

  @Input()
  set dataInput(data: Array<DateIncome>) {
    PlotlyService.plot(this.element, this.get_traces(data), this.layout);
  }

  @Input() start: Date;
  @Input() end: Date;

  layout = {
    showlegend: true,
    title: 'Library Income',
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

  private get_traces(formatData: Array<DateIncome>) {
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
}
