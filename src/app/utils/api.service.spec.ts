import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('should login success', function () {
    const service: ApiService = TestBed.get(ApiService);
    // 'YiiPmt', 'YiiPmtvMYz0zGNMXVHq6'
    // noinspection SpellCheckingInspection
    // service.login('YiiPmt', 'YiiPmtvMYz0zGNMXVHq6', 3).then(res => { expect(res).toBe(true); });
  });

  it('should login failed', function () {
    const service: ApiService = TestBed.get(ApiService);
    // noinspection SpellCheckingInspection
    // service.login('qweasd', 'qweasdzxc', 3).then(res => expect(res).toBe(false));
  });
});
