import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DateIncome} from '../../utils/DataStructs/DateIncome';
import {PlotlyService} from '../../utils/plotly.service';

@Component({
  selector: 'app-plotly-income-pie',
  templateUrl: './plotly-income-pie.component.html',
  styleUrls: ['./plotly-income-pie.component.css']
})
export class PlotlyIncomePieComponent {
  @ViewChild('pie') element: ElementRef;

  @Input()
  set dataInput(incomeData: DateIncome) {
    const data = this.income2data(incomeData);
    const layout = {
      title: incomeData.date.toLocaleDateString()
    };
    PlotlyService.plot(this.element, data, layout);
  }

  constructor() { }

  private income2data(incomeData: DateIncome) {
    return [{
      values: [incomeData.fine, incomeData.deposit],
      labels: ['fine', 'deposit'],
      type: 'pie'
    }];
  }
}
