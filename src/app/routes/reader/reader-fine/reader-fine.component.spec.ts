import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderFineComponent } from './reader-fine.component';

describe('ReaderFineComponent', () => {
  let component: ReaderFineComponent;
  let fixture: ComponentFixture<ReaderFineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderFineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
