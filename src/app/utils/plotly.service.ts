import {ElementRef, Injectable} from '@angular/core';
import * as Plotly from 'plotly.js/dist/plotly-basic.min.js';

export namespace Plotly {
  export type Data = any;
  export type Layout = any;
  export type Config = any;

  export interface Figure {
      data: Data[];
      layout: Partial<Layout>;
      frames: Partial<Config>;
  }

  export interface PlotlyHTMLElement extends HTMLElement {
      on(event: string, callback: Function): void;
      removeListener(event: string, callback: Function): void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlotlyService {

  constructor() { }

  static plot(el: ElementRef, data: Plotly.Data[], layout: Partial<Plotly.Layout>) {
    Plotly.plot(el.nativeElement, data, layout);
  }
}
