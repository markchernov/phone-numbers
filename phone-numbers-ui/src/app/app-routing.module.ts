import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/components/main/main.component';
import { PageNotFoundComponent } from './main/components/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
