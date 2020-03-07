import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PhoneNumberValidatorService {
    isValid(value: string): [boolean, string] {
        if (value.length === 7 || value.length === 10) {
            if (/[^$,\.\d]/.test(value)) {
                return [false, 'Please enter only numeric values'];
            } else if (value.startsWith('0') || value.startsWith('1')) {
                return [false, '0 or 1 is invalid first digit'];
            } else {
                return [true, ''];
            }
        } else {
            return [false, 'Please enter only 7 or 10 digit numbers'];
        }
    }
}
