import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PhoneNumberValidatorService } from '../../services/phone-number-validator.service';
import { PaginationRequestEvent } from '../pagination/pagination.component';
import { PhoneNumberStore } from '../../stores/phone-number.store';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-phone-number-form',
    templateUrl: './phone-number-form.component.html',
    styleUrls: ['./phone-number-form.component.css'],
})
export class PhoneNumberFormComponent implements OnInit {
    @Output() submitClick = new EventEmitter<PaginationRequestEvent>();
    @Output() clearClick = new EventEmitter<void>();
    phoneNumber = new FormControl('');
    phoneNumberStatus: [boolean, string] = [false, ''];

    constructor(
        private phoneNumberValidatorService: PhoneNumberValidatorService,
        private phoneNumberStore: PhoneNumberStore
    ) {}

    ngOnInit(): void {
        this.phoneNumber.valueChanges
            .pipe(
                tap((value: string) => {
                    this.phoneNumberStatus = this.phoneNumberValidatorService.isValid(
                        value
                    );
                    if (this.phoneNumberStatus[0]) {
                        this.phoneNumberStore.setPhoneNumber$(value);
                    }
                })
            )
            .subscribe();
    }

    isDisabled(): boolean {
        return !this.phoneNumberStatus[0];
    }

    submitNumber(): void {
        this.submitClick.emit({ pageNumber: 1, start: 0 });
    }

    clearNumber(): void {
        this.phoneNumberStore.setPhoneNumber$('');
        this.phoneNumber.setValue('');
        this.phoneNumberStatus = [false, ''];
        this.clearClick.emit();
    }
}
