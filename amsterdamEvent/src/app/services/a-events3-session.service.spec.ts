import { TestBed } from '@angular/core/testing';

import { AEvents3SessionService } from './a-events3-session.service';

describe('AEvents3SessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AEvents3SessionService = TestBed.get(AEvents3SessionService);
    expect(service).toBeTruthy();
  });
});
