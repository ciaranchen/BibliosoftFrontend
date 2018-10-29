import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRulesComponent } from './admin-rules.component';

describe('AdminRulesComponent', () => {
  let component: AdminRulesComponent;
  let fixture: ComponentFixture<AdminRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
