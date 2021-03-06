import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
    PhoneNumbersApiClientService,
    CombinationsApiRequest,
} from './phone-numbers-api-client.service';

@Injectable({
    providedIn: 'root',
})
export class PhoneNumbersApiClientStubService extends PhoneNumbersApiClientService {
    fetchCombinations(
        request: CombinationsApiRequest
    ): Observable<{ total: number; combinations: string[] }> {
        const partialNumber = [...request.phoneNumber]
            .slice(0, request.phoneNumber.length)
            .join('');
        const dummyCombinations = [
            partialNumber + 'A',
            partialNumber + 'B',
            partialNumber + 'C',
            partialNumber + 'D',
            partialNumber + 'E',
            partialNumber + 'F',
            partialNumber + 'G',
            partialNumber + 'H',
            partialNumber + 'I',
            partialNumber + 'J',
            partialNumber + 'K',
            partialNumber + 'L',
        ];
        return of({
            total: dummyCombinations.length,
            combinations: dummyCombinations.slice(
                request.start,
                request.start + request.numberOfRecords
            ),
        });
    }
}
