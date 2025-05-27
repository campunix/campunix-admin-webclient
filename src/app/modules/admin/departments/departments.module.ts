import {NgModule} from '@angular/core';
import {AsyncPipe, CommonModule, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import {RouterModule} from "@angular/router";
import {DepartmentsComponent} from "./components/department-list/departments.component";
import {DepartmentsCreateComponent} from "./components/departments-create/departments-create.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule, MatRippleModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from "@angular/material/menu";
import {FuseAlertComponent} from "../../../../@fuse/components/alert";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
    declarations: [DepartmentsComponent, DepartmentsCreateComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgIf,
        MatProgressBarModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSortModule,
        NgFor,
        NgTemplateOutlet,
        MatPaginatorModule,
        NgClass,
        MatSlideToggleModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        MatRippleModule,
        AsyncPipe,
        CurrencyPipe,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: DepartmentsComponent
            },
            {
                path: 'create',
                component: DepartmentsCreateComponent
            },
            {
                path: 'edit/:id',
                component: DepartmentsCreateComponent
            }
        ]),
        MatMenuModule,
        FuseAlertComponent,
        MatTooltipModule
    ]
})
export class DepartmentsModule {
}
