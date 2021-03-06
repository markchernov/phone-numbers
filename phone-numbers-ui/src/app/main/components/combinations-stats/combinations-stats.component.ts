import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PaginationConfig } from '../pagination/pagination.component';
import { PhoneNumberStore } from '../../stores/phone-number.store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-combinations-stats',
    templateUrl: './combinations-stats.component.html',
    styleUrls: ['./combinations-stats.component.css'],
})
export class CombinationsStatsComponent implements OnInit, OnDestroy {
    @Input() totalNumberOfCombinations!: number;
    @Input() paginationConfig!: PaginationConfig;
    @Input() currentPageNumber!: number;
    private sub!: Subscription;
    phoneNumber = 'empty or invalid';

    constructor(private phoneNumberStore: PhoneNumberStore) {}

    ngOnInit(): void {
        this.sub = this.phoneNumberStore
            .getPhoneNumber$()
            .pipe(
                tap(phoneNumber => {
                    this.phoneNumber = phoneNumber
                        ? phoneNumber
                        : 'empty or invalid';
                })
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
