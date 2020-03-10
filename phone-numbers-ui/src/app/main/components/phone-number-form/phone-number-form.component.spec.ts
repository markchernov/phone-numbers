import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneNumberFormComponent } from './phone-number-form.component';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
});
