import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianAddBookComponent } from './librarian-add-book.component';

describe('LibrarianAddBookComponent', () => {
  let component: LibrarianAddBookComponent;
  let fixture: ComponentFixture<LibrarianAddBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarianAddBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianAddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
