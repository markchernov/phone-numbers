import { TestBed } from '@angular/core/testing';
import { PhoneNumberStore } from './phone-number.store';

describe('PhoneNumberStore', () => {
    let store: PhoneNumberStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        store = TestBed.inject(PhoneNumberStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should set and get current value', () => {
        store.setPhoneNumber$('7654321');
        expect(store.getPhoneNumberCurrentValue()).toEqual('7654321');
    });

    it('should notify about new value', () => {
        expect(store.getPhoneNumberCurrentValue()).toEqual('');
        store.setPhoneNumber$('7654321');
        store.getPhoneNumber$().subscribe(value => {
            expect(value).toEqual('7654321');
        });
    });
});
