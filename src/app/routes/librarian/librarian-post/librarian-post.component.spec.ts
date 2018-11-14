import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianPostComponent } from './librarian-post.component';

describe('LibrarianPostComponent', () => {
  let component: LibrarianPostComponent;
  let fixture: ComponentFixture<LibrarianPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarianPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
