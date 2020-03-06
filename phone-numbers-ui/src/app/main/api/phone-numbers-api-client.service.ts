import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PhoneNumbersApiClientService {
    constructor(private http: HttpClient) {}

    fetchCombinations(
        phoneNumber: string,
        start: number,
        numberOfRecords: number
    ): Observable<{ total: number; combinations: string[] }> {
        return this.http.post<{ total: number; combinations: string[] }>(
            'localhost:8080/combinations',
            {
                phoneNumber,
                start,
                numberOfRecords,
            }
        );
    }
}
