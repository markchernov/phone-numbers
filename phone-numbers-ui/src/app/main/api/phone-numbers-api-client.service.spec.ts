import { TestBed } from '@angular/core/testing';

import { PhoneNumbersApiClientService } from './phone-numbers-api-client.service';

describe('PhoneNumbersApiClientService', () => {
  let service: PhoneNumbersApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneNumbersApiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
