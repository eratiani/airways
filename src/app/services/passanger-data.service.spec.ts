import { TestBed } from '@angular/core/testing';

import { PassangerDataService } from './passanger-data.service';

describe('PassangerDataService', () => {
  let service: PassangerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassangerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
