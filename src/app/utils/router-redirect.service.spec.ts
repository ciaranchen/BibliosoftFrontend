import { TestBed } from '@angular/core/testing';

import { RouterRedirectService } from './router-redirect.service';

describe('RouterRedirectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouterRedirectService = TestBed.get(RouterRedirectService);
    expect(service).toBeTruthy();
  });
});
