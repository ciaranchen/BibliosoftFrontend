import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianReturnComponent } from './librarian-return.component';

describe('LibrarianReturnComponent', () => {
  let component: LibrarianReturnComponent;
  let fixture: ComponentFixture<LibrarianReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarianReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
