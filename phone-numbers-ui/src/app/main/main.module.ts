import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CombinationsListComponent } from './components/combinations-list/combinations-list.component';
import { CombinationsStatsComponent } from './components/combinations-stats/combinations-stats.component';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PhoneNumberFormComponent } from './components/phone-number-form/phone-number-form.component';

@NgModule({
    declarations: [
        MainComponent,
        PageNotFoundComponent,
        PaginationComponent,
        CombinationsListComponent,
        CombinationsStatsComponent,
        PhoneNumberFormComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
    ],
})
export class MainModule {}
