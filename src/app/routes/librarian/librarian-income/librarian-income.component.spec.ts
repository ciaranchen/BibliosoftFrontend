import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianIncomeComponent } from './librarian-income.component';

describe('LibrarianIncomeComponent', () => {
  let component: LibrarianIncomeComponent;
  let fixture: ComponentFixture<LibrarianIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarianIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
