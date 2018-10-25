import { TestBed } from '@angular/core/testing';

import { DoubanService } from './douban.service';

describe('DoubanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoubanService = TestBed.get(DoubanService);
    expect(service).toBeTruthy();
  });

  it('should returned certain book', () => {
    const service: DoubanService = TestBed.get(DoubanService);
    service.searchISBN('9787101003048')
      .then(res => {
        // expect(res).toEqual();
      });
  });
});
