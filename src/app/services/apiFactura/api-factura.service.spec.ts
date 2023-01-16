import { TestBed } from '@angular/core/testing';

import { ApiFacturaService } from './api-factura.service';

describe('ApiFacturaService', () => {
  let service: ApiFacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
