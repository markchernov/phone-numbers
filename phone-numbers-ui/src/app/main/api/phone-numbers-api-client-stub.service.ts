import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PhoneNumbersApiClientService } from './phone-numbers-api-client.service';

@Injectable({
    providedIn: 'root',
})
export class PhoneNumbersApiClientStubService extends PhoneNumbersApiClientService {
    fetchCombinations(
        phoneNumber: string,
        start: number,
        numberOfRecords: number
    ): Observable<{ total: number; combinations: string[] }> {
        const partialNumber = [...phoneNumber]
            .slice(0, phoneNumber.length)
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
                start,
                start + numberOfRecords
            ),
        });
    }
}
