import { TestBed } from '@angular/core/testing';

import { IsUserService } from './is-user.service';

describe('IsUserService', () => {
  let service: IsUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
