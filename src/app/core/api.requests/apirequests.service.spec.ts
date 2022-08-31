import { TestBed } from '@angular/core/testing';

import { ApiRequestsService } from './apirequests.service';

describe('Api.RequestsService', () => {
  let service: ApiRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
