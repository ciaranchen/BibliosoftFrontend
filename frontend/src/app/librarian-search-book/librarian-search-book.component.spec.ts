import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianSearchBookComponent } from './librarian-search-book.component';

describe('LibrarianSearchBookComponent', () => {
  let component: LibrarianSearchBookComponent;
  let fixture: ComponentFixture<LibrarianSearchBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarianSearchBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianSearchBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
