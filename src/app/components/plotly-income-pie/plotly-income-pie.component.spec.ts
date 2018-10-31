import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotlyIncomePieComponent } from './plotly-income-pie.component';

describe('PlotlyIncomePieComponent', () => {
  let component: PlotlyIncomePieComponent;
  let fixture: ComponentFixture<PlotlyIncomePieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotlyIncomePieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotlyIncomePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
