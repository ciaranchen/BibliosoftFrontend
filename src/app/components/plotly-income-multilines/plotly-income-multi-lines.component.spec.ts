import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotlyIncomeMultiLinesComponent } from './plotly-income-multi-lines.component';

describe('PlotlyIncomeMultiLinesComponent', () => {
  let component: PlotlyIncomeMultiLinesComponent;
  let fixture: ComponentFixture<PlotlyIncomeMultiLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotlyIncomeMultiLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotlyIncomeMultiLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
