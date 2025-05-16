import {NgModule} from '@angular/core';
import {AsyncPipe, CommonModule, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import {RouterModule} from "@angular/router";
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
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { RoutineViewComponent } from './components/routine-view/routine-view.component';
import { RoutineCellComponent } from './components/routine-cell/routine-cell.component';
import { RoutineFormComponent } from './components/routine-form/routine-form.component';
import { ClassRoutineCreateComponent } from './components/class-routine-create/class-routine-create.component';

@NgModule({
    declarations: [
        ClassRoutineCreateComponent,
        RoutineViewComponent,
        RoutineCellComponent,
        RoutineFormComponent
    ],
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
        MatDatepickerModule,
        AsyncPipe,
        CurrencyPipe,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'view'
            },
            {
                path: 'view',
                component: RoutineViewComponent
            },
            {
                path: 'class/create',
                component: ClassRoutineCreateComponent
            },
            {
                path: 'exam/create',
                component: RoutineFormComponent
            }
        ]),
        MatMenuModule,
        MatChipsModule
    ]
})
export class RoutineModule {
}
