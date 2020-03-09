import { Component, Input } from '@angular/core';
import { PaginationConfig } from '../pagination/pagination.component';

@Component({
    selector: 'app-combinations-stats',
    templateUrl: './combinations-stats.component.html',
    styleUrls: ['./combinations-stats.component.css'],
})
export class CombinationsStatsComponent {
    @Input() totalNumberOfCombinations!: number;
    @Input() paginationConfig!: PaginationConfig;
    @Input() currentPageNumber!: number;
}
