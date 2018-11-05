import {ElementRef, Injectable} from '@angular/core';
import * as Plotly from 'plotly.js/dist/plotly-basic.min.js';

@Injectable({
  providedIn: 'root'
})
export class PlotlyService {

  constructor() { }

  static plot(el: ElementRef, data, layout) {
    Plotly.plot(el.nativeElement, data, layout);
  }
}
