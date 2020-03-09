import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PhoneNumberValidatorService } from '../../services/phone-number-validator.service';
import {
    PaginationConfig,
    PaginationRequestEvent,
} from '../pagination/pagination.component';
import { PhoneNumbersApiClientService } from '../../api/phone-numbers-api-client.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
    phoneNumber = new FormControl('');
    phoneNumberStatus: [boolean, string] = [false, ''];
    combinations: string[] = [];
    totalNumberOfCombinations = 0;
    paginationConfig: PaginationConfig = this.getDefaultPaginationConfig();
    currentPageNumber = 1;

    constructor(
        private phoneNumberValidatorService: PhoneNumberValidatorService,
        private phoneNumbersApiClientService: PhoneNumbersApiClientService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.phoneNumber.valueChanges.subscribe((value: string) => {
            if (this.combinations.length !== 0) {
                this.clearResults();
            }
            this.phoneNumberStatus = this.phoneNumberValidatorService.isValid(
                value
            );
            this.cd.markForCheck();
        });
    }

    submitNumber(): void {
        this.fetchPhoneNumberCombinations({ pageNumber: 1, start: 0 });
    }

    fetchCombinationsPerPage(request: PaginationRequestEvent): void {
        this.fetchPhoneNumberCombinations(request);
    }

    isDisabled(): boolean {
        return !this.phoneNumberStatus[0];
    }

    private clearResults(): void {
        this.combinations = [];
        this.totalNumberOfCombinations = 0;
        this.paginationConfig = this.getDefaultPaginationConfig();
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
                phoneNumber: this.phoneNumber.value,
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
