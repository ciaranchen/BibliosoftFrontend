import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderBorrowingComponent } from './reader-borrowing.component';

describe('ReaderBorrowingComponent', () => {
  let component: ReaderBorrowingComponent;
  let fixture: ComponentFixture<ReaderBorrowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderBorrowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
