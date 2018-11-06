import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DateIncome} from '../../utils/DataStructs/DateIncome';
import {PlotlyService, Plotly} from '../../utils/plotly.service';

@Component({
  selector: 'app-plotly-income-multi-lines',
  templateUrl: './plotly-income-multi-lines.component.html',
  styleUrls: ['./plotly-income-multi-lines.component.css']
})
export class PlotlyIncomeMultiLinesComponent {
  @ViewChild('lines') element: ElementRef;

  @Input()
  set dataInput(data: Array<DateIncome>) {
    const layout = this.get_layout(this.start, this.end);
    const plot_data = this.get_traces(data);
    PlotlyService.plot(this.element, plot_data, layout);
  }

  @Input() start: Date;
  @Input() end: Date;

  constructor() {}

  private get_layout(start: Date, end: Date): Partial<Plotly.Layout> {
    return {
      showlegend: true,
      title: 'Library Income',
      xaxis: {
        autorange: true,
        range: [
          start,
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
  }

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
}
