import { TestBed } from '@angular/core/testing';

import { ApiMenuService } from './api-menu.service';

describe('ApiMenuService', () => {
  let service: ApiMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
