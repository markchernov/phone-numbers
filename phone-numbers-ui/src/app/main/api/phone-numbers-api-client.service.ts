import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PhoneNumbersApiClientService {
    constructor(private http: HttpClient) {}

    fetchCombinations(
        request: CombinationsApiRequest
    ): Observable<CombinationsApiResponse> {
        return this.http.post<CombinationsApiResponse>(
            'http://localhost:4200/api/combinations',
            request
        );
    }
}

export interface CombinationsApiResponse {
    total: number;
    combinations: string[];
}

export interface CombinationsApiRequest {
    phoneNumber: string;
    start: number;
    numberOfRecords: number;
}
