import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CombinationsStatsComponent } from './combinations-stats.component';
import { PhoneNumberStore } from '../../stores/phone-number.store';

describe('CombinationsStatsComponent', () => {
    let component: CombinationsStatsComponent;
    let fixture: ComponentFixture<CombinationsStatsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CombinationsStatsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CombinationsStatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set phone number onInit and subscribe to updates', () => {
        const store = TestBed.inject(PhoneNumberStore);
        store.setPhoneNumber$('321');
        expect(component.phoneNumber).toEqual('321');
        store.setPhoneNumber$('123');
        expect(component.phoneNumber).toEqual('123');
    });
});
