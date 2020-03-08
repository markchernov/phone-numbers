import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import {
    PhoneNumbersApiClientService,
    CombinationsApiResponse,
} from './phone-numbers-api-client.service';
import { HttpClient } from '@angular/common/http';

describe('PhoneNumbersApiClientService', () => {
    let service: PhoneNumbersApiClientService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(PhoneNumbersApiClientService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetchCombinations', () => {
        const testData: CombinationsApiResponse = {
            total: 2,
            combinations: ['abc', 'xyz'],
        };
        const request = { phoneNumber: '123', start: 0, numberOfRecords: 2 };

        service
            .fetchCombinations(request)
            .subscribe(data => expect(data).toEqual(testData));

        const req = httpTestingController.expectOne(
            'http://localhost:4200/api/combinations'
        );

        expect(req.request.method).toEqual('POST');

        req.flush(testData);

        httpTestingController.verify();
    });
});
