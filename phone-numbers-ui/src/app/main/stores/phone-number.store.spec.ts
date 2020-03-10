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
});
