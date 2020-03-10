import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import {
    PaginationConfig,
    PaginationRequestEvent,
} from '../pagination/pagination.component';
import { PhoneNumbersApiClientService } from '../../api/phone-numbers-api-client.service';
import { PhoneNumberStore } from '../../stores/phone-number.store';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
    combinations: string[] = [];
    totalNumberOfCombinations = 0;
    paginationConfig: PaginationConfig = this.getDefaultPaginationConfig();
    currentPageNumber = 1;

    constructor(
        private phoneNumbersApiClientService: PhoneNumbersApiClientService,
        private phoneNumberStore: PhoneNumberStore,
        private cd: ChangeDetectorRef
    ) {}

    fetchCombinationsPerPage(request: PaginationRequestEvent): void {
        this.fetchPhoneNumberCombinations(request);
    }

    clearResults(): void {
        this.combinations = [];
        this.totalNumberOfCombinations = 0;
        this.paginationConfig = this.getDefaultPaginationConfig();
        this.currentPageNumber = 1;
    }

    private getDefaultPaginationConfig(): PaginationConfig {
        return {
            totalNumberOfCombinations: 0,
            combinationsPerPage: 10,
        };
    }

    private fetchPhoneNumberCombinations(
        request: PaginationRequestEvent
    ): void {
        this.currentPageNumber = request.pageNumber;
        this.phoneNumbersApiClientService
            .fetchCombinations({
                phoneNumber: this.phoneNumberStore.getPhoneNumberCurrentValue(),
                start: request.start,
                numberOfRecords: this.getDefaultPaginationConfig()
                    .combinationsPerPage,
            })
            .subscribe(result => {
                this.totalNumberOfCombinations = result.total;
                this.combinations = result.combinations;
                this.paginationConfig = {
                    totalNumberOfCombinations: this.totalNumberOfCombinations,
                    combinationsPerPage: this.getDefaultPaginationConfig()
                        .combinationsPerPage,
                };
                this.cd.markForCheck();
            });
    }
}
