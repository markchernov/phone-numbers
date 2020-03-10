import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
/**
 * Container for current state of a phone number
 * to be multicasted across components.
 */
export class PhoneNumberStore {
    private readonly phoneNumber$: BehaviorSubject<
        string
    > = new BehaviorSubject<string>('');

    getPhoneNumberCurrentValue(): string {
        return this.phoneNumber$.getValue();
    }

    getPhoneNumber$(): Observable<string> {
        return this.phoneNumber$.asObservable();
    }

    setPhoneNumber$(phoneNumber: string): void {
        this.phoneNumber$.next(phoneNumber);
    }
}
