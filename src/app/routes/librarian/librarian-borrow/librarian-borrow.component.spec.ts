import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianBorrowComponent } from './librarian-borrow.component';

describe('LibrarianBorrowComponent', () => {
  let component: LibrarianBorrowComponent;
  let fixture: ComponentFixture<LibrarianBorrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarianBorrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
