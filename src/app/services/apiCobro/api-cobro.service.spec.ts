import { TestBed } from '@angular/core/testing';

import { ApiCobroService } from './api-cobro.service';

describe('ApiCobroService', () => {
  let service: ApiCobroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCobroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
