import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PhoneNumbersApiClientService } from '../../api/phone-numbers-api-client.service';
import { PhoneNumbersApiClientStubService } from '../../api/phone-numbers-api-client-stub.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CombinationsListComponent } from '../combinations-list/combinations-list.component';
import { CombinationsStatsComponent } from '../combinations-stats/combinations-stats.component';
import { PhoneNumberStore } from '../../stores/phone-number.store';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { PhoneNumberFormComponent } from '../phone-number-form/phone-number-form.component';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MainComponent,
                PaginationComponent,
                CombinationsListComponent,
                CombinationsStatsComponent,
                PhoneNumberFormComponent,
                MatLabel,
            ],
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                MatCardModule,
                MatListModule,
                MatFormFieldModule,
                MatInputModule,
                NoopAnimationsModule,
            ],
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
        expect(component.combinations).toEqual([]);
        expect(component.totalNumberOfCombinations).toEqual(0);
        expect(component.currentPageNumber).toEqual(1);
        expect(component.paginationConfig).toEqual({
            totalNumberOfCombinations: 0,
            combinationsPerPage: 10,
        });
    });

    it('clearResults should clear component state', () => {
        component.combinations = ['abc, xyz'];
        component.totalNumberOfCombinations = 2;
        component.currentPageNumber = -1;
        component.paginationConfig = {
            totalNumberOfCombinations: 2,
            combinationsPerPage: 5,
        };

        expect(component.combinations).toEqual(['abc, xyz']);
        expect(component.totalNumberOfCombinations).toEqual(2);
        expect(component.currentPageNumber).toEqual(-1);
        expect(component.paginationConfig).toEqual({
            totalNumberOfCombinations: 2,
            combinationsPerPage: 5,
        });

        component.clearResults();

        expect(component.combinations).toEqual([]);
        expect(component.totalNumberOfCombinations).toEqual(0);
        expect(component.currentPageNumber).toEqual(1);
        expect(component.paginationConfig).toEqual({
            totalNumberOfCombinations: 0,
            combinationsPerPage: 10,
        });
    });

    it('fetchCombinationsPerPage should call fetchCombinations', () => {
        const service: PhoneNumbersApiClientService = TestBed.inject(
            PhoneNumbersApiClientService
        );
        const store: PhoneNumberStore = TestBed.inject(PhoneNumberStore);
        const spy = spyOn(service, 'fetchCombinations').and.callThrough();
        store.setPhoneNumber$('qwerty');

        component.fetchCombinationsPerPage({ start: 40, pageNumber: 3 });

        expect(spy).toHaveBeenCalledWith({
            phoneNumber: 'qwerty',
            start: 40,
            numberOfRecords: 10,
        });
    });
});
