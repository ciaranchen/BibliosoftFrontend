import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianManageReaderComponent } from './librarian-manage-reader.component';

describe('LibrarianManageReaderComponent', () => {
  let component: LibrarianManageReaderComponent;
  let fixture: ComponentFixture<LibrarianManageReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarianManageReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianManageReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
