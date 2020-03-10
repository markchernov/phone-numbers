import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PhoneNumberStore {
    private readonly phoneNumber$: BehaviorSubject<
        string
    > = new BehaviorSubject<string>('');

    getPhoneNumberCurrentValue(): string {
        return this.phoneNumber$.getValue();
    }

    setPhoneNumber$(phoneNumber: string): void {
        this.phoneNumber$.next(phoneNumber);
    }
}
