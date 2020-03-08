import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PhoneNumbersApiClientService } from '../../api/phone-numbers-api-client.service';
import { PhoneNumbersApiClientStubService } from '../../api/phone-numbers-api-client-stub.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainComponent, PaginationComponent],
            imports: [HttpClientTestingModule, ReactiveFormsModule],
            providers: [
                {
                    provide: PhoneNumbersApiClientService,
                    useClass: PhoneNumbersApiClientStubService,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should start on page 1, with default pagination config and submit button disabled', () => {
        expect(component.currentPageNumber).toEqual(1);
        expect(component.phoneNumberStatus).toEqual([false, '']);
        // tslint:disable-next-line
        expect(component['getDefaultPaginationConfig']()).toEqual({
            totalNumberOfCombinations: 0,
            combinationsPerPage: 20,
        });
    });

    it('submitNumber should call fetchCombinations', () => {
        const service: PhoneNumbersApiClientService = TestBed.inject(
            PhoneNumbersApiClientService
        );
        const spy = spyOn(service, 'fetchCombinations').and.callThrough();
        component.phoneNumber.patchValue('qwerty');
        component.submitNumber();
        expect(spy).toHaveBeenCalledWith({
            phoneNumber: 'qwerty',
            start: 0,
            numberOfRecords: 20,
        });
    });

    it('fetchCombinationsPerPage should call fetchCombinations', () => {
        const service: PhoneNumbersApiClientService = TestBed.inject(
            PhoneNumbersApiClientService
        );
        const spy = spyOn(service, 'fetchCombinations').and.callThrough();
        component.phoneNumber.patchValue('qwerty');
        component.fetchCombinationsPerPage({ start: 40, pageNumber: 3 });
        expect(spy).toHaveBeenCalledWith({
            phoneNumber: 'qwerty',
            start: 40,
            numberOfRecords: 20,
        });
    });
});
