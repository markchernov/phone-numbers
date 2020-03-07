import { Component, OnInit } from '@angular/core';
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
})
export class MainComponent implements OnInit {
    private readonly combinationsPerPage = 20;
    phoneNumber = new FormControl('');
    phoneNumberStatus: [boolean, string] = [false, ''];
    combinations: string[] = [];
    totalNumberOfCombinations = 0;
    paginationConfig: PaginationConfig = this.getDefaultPaginationConfig();
    currentPageNumber = 1;

    constructor(
        private phoneNumberValidatorService: PhoneNumberValidatorService,
        private phoneNumbersApiClientService: PhoneNumbersApiClientService
    ) {}

    ngOnInit(): void {
        this.phoneNumber.valueChanges.subscribe((value: string) => {
            if (this.combinations.length !== 0) {
                this.clearResults();
            }
            this.phoneNumberStatus = this.phoneNumberValidatorService.isValid(
                value
            );
        });
    }

    submitNumber(): void {
        this.fetchPhoneNumberCombinations({ pageNumber: 1, start: 0 });
    }

    fetchCombinationsPerPage(request: PaginationRequestEvent): void {
        this.fetchPhoneNumberCombinations(request);
    }
    private clearResults(): void {
        this.combinations = [];
        this.totalNumberOfCombinations = 0;
        this.paginationConfig = this.getDefaultPaginationConfig();
    }

    private getDefaultPaginationConfig(): PaginationConfig {
        return {
            totalNumberOfCombinations: 0,
            combinationsPerPage: this.combinationsPerPage,
        };
    }

    private fetchPhoneNumberCombinations(
        request: PaginationRequestEvent
    ): void {
        console.log('PAGINATION REQUEST: ', request);
        this.currentPageNumber = request.pageNumber;
        this.phoneNumbersApiClientService
            .fetchCombinations(
                this.phoneNumber.value,
                request.start,
                this.combinationsPerPage
            )
            .subscribe(result => {
                console.log('RESULT: ', result);
                this.totalNumberOfCombinations = result.total;
                this.combinations = result.combinations;
                this.paginationConfig = {
                    totalNumberOfCombinations: this.totalNumberOfCombinations,
                    combinationsPerPage: this.combinationsPerPage,
                };
            });
    }
}
