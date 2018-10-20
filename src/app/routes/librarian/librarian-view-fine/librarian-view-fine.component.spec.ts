import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianViewFineComponent } from './librarian-view-fine.component';

describe('LibrarianViewFineComponent', () => {
  let component: LibrarianViewFineComponent;
  let fixture: ComponentFixture<LibrarianViewFineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarianViewFineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianViewFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
