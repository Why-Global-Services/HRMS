import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sendHomeGuard } from './send-home.guard';

describe('sendHomeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sendHomeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
