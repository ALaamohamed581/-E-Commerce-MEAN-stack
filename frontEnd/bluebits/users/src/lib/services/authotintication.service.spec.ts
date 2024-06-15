import { TestBed } from '@angular/core/testing';

import { AuthotinticationService } from './authotintication.service';

describe('AuthotinticationService', () => {
  let service: AuthotinticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthotinticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
