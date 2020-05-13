import { TestBed } from '@angular/core/testing';

import { ForeignMappingService } from './foreign-mapping.service';

describe('ForeignMappingService', () => {
  let service: ForeignMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForeignMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
