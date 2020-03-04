import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
    declarations: [MainComponent, PageNotFoundComponent, PaginationComponent],
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class MainModule {}
