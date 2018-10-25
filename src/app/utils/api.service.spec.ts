import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  // noinspection SpellCheckingInspection
  // noinspection SpellCheckingInspection
  // noinspection SpellCheckingInspection
  // noinspection SpellCheckingInspection
  it('should user_login success', function () {
    const service: ApiService = TestBed.get(ApiService);
    // 'YiiPmt', 'YiiPmtvMYz0zGNMXVHq6'
    // noinspection SpellCheckingInspection
    // service.user_login('YiiPmt', 'YiiPmtvMYz0zGNMXVHq6', 3).then(res => { expect(res).toBe(true); });
  });

  // noinspection SpellCheckingInspection
  // noinspection SpellCheckingInspection
  it('should user_login failed', function () {
    const service: ApiService = TestBed.get(ApiService);
    // noinspection SpellCheckingInspection
    // service.user_login('qweasd', 'qweasdzxc', 3).then(res => expect(res).toBe(false));
  });
});
