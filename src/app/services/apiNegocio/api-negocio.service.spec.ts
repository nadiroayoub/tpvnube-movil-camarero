import { TestBed } from '@angular/core/testing';

import { ApiNegocioService } from './api-negocio.service';

describe('ApiNegocioService', () => {
  let service: ApiNegocioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiNegocioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
