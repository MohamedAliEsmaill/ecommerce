import { TestBed } from '@angular/core/testing';

import { IsNotLoggedService } from './is-not-logged.service';

describe('IsNotLoggedService', () => {
  let service: IsNotLoggedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsNotLoggedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
