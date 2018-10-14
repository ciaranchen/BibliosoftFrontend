import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderViewPaymentComponent } from './reader-view-payment.component';

describe('ReaderViewPaymentComponent', () => {
  let component: ReaderViewPaymentComponent;
  let fixture: ComponentFixture<ReaderViewPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderViewPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderViewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
