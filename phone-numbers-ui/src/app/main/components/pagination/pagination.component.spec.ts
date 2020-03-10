import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaginationComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create pagination with cinfig object values', async () => {
        component.createPagination = {
            totalNumberOfCombinations: 32,
            combinationsPerPage: 10,
        };
        // 32 total, 10 per page = 4 pagination buttons (10, 10, 10, 2)
        expect(component.paginationButtonNumbers).toEqual([1, 2, 3, 4]);
        // tslint:disable-next-line
        expect(component['combinationsPerPage']).toEqual(10);
    });

    it('should emit click event', async () => {
        component.createPagination = {
            totalNumberOfCombinations: 32,
            combinationsPerPage: 10,
        };
        const spy = spyOn(component.pageNumberClick, 'emit');

        component.onPageNumberClick(2);
        expect(spy).toHaveBeenCalledWith({ pageNumber: 2, start: 10 });
    });
});
