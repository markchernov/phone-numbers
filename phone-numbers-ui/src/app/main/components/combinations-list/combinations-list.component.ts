import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-combinations-list',
    templateUrl: './combinations-list.component.html',
    styleUrls: ['./combinations-list.component.css'],
})
export class CombinationsListComponent {
    @Input() combinations: string[] = [];
}
