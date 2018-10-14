import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageLibrarianComponent } from './admin-manage-librarian.component';

describe('AdminManageLibrarianComponent', () => {
  let component: AdminManageLibrarianComponent;
  let fixture: ComponentFixture<AdminManageLibrarianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageLibrarianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageLibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
