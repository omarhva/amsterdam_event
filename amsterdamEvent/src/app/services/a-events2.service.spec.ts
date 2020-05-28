import { TestBed } from '@angular/core/testing';

import { AEvents2Service } from './a-events2.service';

describe('AEvents2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AEvents2Service = TestBed.get(AEvents2Service);
    expect(service).toBeTruthy();
  });
});
