import { TestBed } from '@angular/core/testing';

import { AttenServiceService } from './atten-service.service';

describe('AttenServiceService', () => {
  let service: AttenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
