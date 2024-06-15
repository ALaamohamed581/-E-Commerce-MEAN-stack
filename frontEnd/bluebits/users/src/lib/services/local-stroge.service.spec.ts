import { TestBed } from '@angular/core/testing';

import { LocalStrogeService } from './local-stroge.service';

describe('LocalStrogeService', () => {
  let service: LocalStrogeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStrogeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
