import { Component, Input, Output, EventEmitter } from '@angular/core';
import { times } from 'lodash';
import {} from 'protractor';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
    @Input('paginationConfig')
    set createPagination(paginationConfig: PaginationConfig) {
        const numberOfPages =
            paginationConfig.totalNumberOfCombinations !== 0
                ? Math.floor(
                      paginationConfig.totalNumberOfCombinations /
                          paginationConfig.combinationsPerPage +
                          1
                  )
                : 0;
        this.paginationButtonNumbers = times(numberOfPages, num => num + 1);
        this.combinationsPerPage = paginationConfig.combinationsPerPage;
    }
    @Output() pageNumberClicked = new EventEmitter<number>();

    paginationButtonNumbers: number[] = [];

    private combinationsPerPage = 0;

    onPageNumberClick(pageNumber: number): void {
        pageNumber === 1
            ? this.pageNumberClicked.emit(0)
            : this.pageNumberClicked.emit(
                  pageNumber * this.combinationsPerPage -
                      this.combinationsPerPage
              );
    }
}

export interface PaginationConfig {
    totalNumberOfCombinations: number;
    combinationsPerPage: number;
}
