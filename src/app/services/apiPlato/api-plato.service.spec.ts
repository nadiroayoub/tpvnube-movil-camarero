import { TestBed } from '@angular/core/testing';

import { ApiPlatoService } from './api-plato.service';

describe('ApiPlatoService', () => {
  let service: ApiPlatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPlatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
