import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PhoneNumberValidatorService } from '../../services/phone-number-validator.service';
import { PhoneNumbersApiClientStubService } from '../../api/phone-numbers-api-client-stub.service';
import { PaginationConfig } from '../pagination/pagination.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    private readonly combinationsPerPage = 5;
    phoneNumber = new FormControl('');
    phoneNumberStatus: [boolean, string] = [false, ''];
    combinations: string[] = [];
    totalNumberOfCombinations = 0;
    paginationConfig: PaginationConfig = {
        totalNumberOfCombinations: 0,
        combinationsPerPage: this.combinationsPerPage,
    };

    constructor(
        private phoneNumberValidatorService: PhoneNumberValidatorService,
        private phoneNumbersApiClientService: PhoneNumbersApiClientStubService // using Stub pending Api implementation
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
        this.combinations = [];
        this.phoneNumbersApiClientService
            .fetchPhoneNumbers(
                this.phoneNumber.value,
                0,
                this.combinationsPerPage
            )
            .subscribe(result => {
                this.totalNumberOfCombinations = result.total;
                this.combinations = result.combinations;
                this.paginationConfig = {
                    totalNumberOfCombinations: this.totalNumberOfCombinations,
                    combinationsPerPage: this.combinationsPerPage,
                };
            });
    }

    fetchCombinationsPerPage(pageNumber: number): void {
        this.phoneNumbersApiClientService
            .fetchPhoneNumbers(
                this.phoneNumber.value,
                pageNumber,
                this.combinationsPerPage
            )
            .subscribe(result => {
                this.totalNumberOfCombinations = result.total;
                this.combinations = result.combinations;
                this.paginationConfig = {
                    totalNumberOfCombinations: this.totalNumberOfCombinations,
                    combinationsPerPage: this.combinationsPerPage,
                };
            });
    }
    private clearResults(): void {
        this.combinations = [];
        this.totalNumberOfCombinations = 0;
    }
}
