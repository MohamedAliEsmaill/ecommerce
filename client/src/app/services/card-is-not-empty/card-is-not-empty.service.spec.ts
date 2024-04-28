import { TestBed } from '@angular/core/testing';

import { CardIsNotEmptyService } from './card-is-not-empty.service';

describe('CardIsNotEmptyService', () => {
  let service: CardIsNotEmptyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardIsNotEmptyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
