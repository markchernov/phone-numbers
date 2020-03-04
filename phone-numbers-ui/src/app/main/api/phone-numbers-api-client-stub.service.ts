import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PhoneNumbersApiClientService } from './phone-numbers-api-client.service';

@Injectable({
    providedIn: 'root',
})
export class PhoneNumbersApiClientStubService extends PhoneNumbersApiClientService {
    private readonly dummyCombinations = [
        '123456Q',
        '123456W',
        '123456E',
        '123456R',
        '123456T',
        '123456Y',
        '123456U',
        '123456I',
        '123456O',
        '123456P',
        '123456{',
    ];

    fetchPhoneNumbers(
        _: string,
        start: number,
        numberOfRecords: number
    ): Observable<{ total: number; combinations: string[] }> {
        return of({
            total: this.dummyCombinations.length,
            combinations: this.dummyCombinations.slice(
                start,
                start + numberOfRecords
            ),
        });
    }
}
