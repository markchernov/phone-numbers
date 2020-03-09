import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CombinationsStatsComponent } from './combinations-stats.component';

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
});
