import { TestBed } from '@angular/core/testing';

import { GlobalServicesService } from './global-services.service';

describe('GlobalServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalServicesService = TestBed.get(GlobalServicesService);
    expect(service).toBeTruthy();
  });
});
