import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneNumberFormComponent } from './phone-number-form.component';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PhoneNumberValidatorService } from '../../services/phone-number-validator.service';
import { PhoneNumberStore } from '../../stores/phone-number.store';

describe('PhoneNumberFormComponent', () => {
    let component: PhoneNumberFormComponent;
    let fixture: ComponentFixture<PhoneNumberFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PhoneNumberFormComponent, MatLabel],
            imports: [
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                NoopAnimationsModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PhoneNumberFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call validator on number change', () => {
        const spy = spyOn(
            TestBed.inject(PhoneNumberValidatorService),
            'isValid'
        ).and.callThrough();

        component.phoneNumber.patchValue('123');

        expect(spy).toHaveBeenCalledWith('123');
        expect(component.phoneNumberStatus).toEqual([
            false,
            'Please enter only 7 or 10 digit numbers',
        ]);
    });

    it('should emit submit event', () => {
        const spy = spyOn(component.submitClick, 'emit');

        component.submitNumber();

        expect(spy).toHaveBeenCalledWith({ pageNumber: 1, start: 0 });
    });

    it('should emit clear event and reset component state', () => {
        const spy = spyOn(component.clearClick, 'emit');

        component.clearNumber();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(component.phoneNumber.value).toEqual('');
        expect(
            TestBed.inject(PhoneNumberStore).getPhoneNumberCurrentValue()
        ).toEqual('');
    });
});
