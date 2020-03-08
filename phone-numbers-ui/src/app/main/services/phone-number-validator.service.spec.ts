import { TestBed } from '@angular/core/testing';
import { PhoneNumberValidatorService } from './phone-number-validator.service';

describe('PhoneNumberValidatorService', () => {
    let service: PhoneNumberValidatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PhoneNumberValidatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fail empty string', () => {
        expect(service.isValid('')).toEqual([
            false,
            'Please enter only 7 or 10 digit numbers',
        ]);
    });

    it('should fail when starts with 0', () => {
        expect(service.isValid('0123456')).toEqual([
            false,
            '0 or 1 is invalid first digit',
        ]);
    });

    it('should fail when starts with 1', () => {
        expect(service.isValid('1234567')).toEqual([
            false,
            '0 or 1 is invalid first digit',
        ]);
    });

    it('should fail when less than 7 digits', () => {
        expect(service.isValid('123456')).toEqual([
            false,
            'Please enter only 7 or 10 digit numbers',
        ]);
    });

    it('should fail when more than 7 but less than 10 digits', () => {
        expect(service.isValid('12345678')).toEqual([
            false,
            'Please enter only 7 or 10 digit numbers',
        ]);
        expect(service.isValid('123456789')).toEqual([
            false,
            'Please enter only 7 or 10 digit numbers',
        ]);
    });

    it('should fail when more than 10 digits', () => {
        expect(service.isValid('12345678912')).toEqual([
            false,
            'Please enter only 7 or 10 digit numbers',
        ]);
    });

    it('should pass 7 or 10 digits', () => {
        expect(service.isValid('2345678')).toEqual([true, '']);
        expect(service.isValid('2345678912')).toEqual([true, '']);
    });
});
