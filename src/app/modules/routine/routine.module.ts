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
import { ClassRoutineViewComponent } from './components/routine-view/class-routine-view.component';
import { RoutineCellComponent } from './components/routine-cell/routine-cell.component';
import { ExamRoutineFormComponent } from './components/exam-routine-form/exam-routine-form.component';
import { ClassRoutineFormComponent } from './components/class-routine-form/class-routine-form.component';
import { ClassRoutineListComponent } from './components/class-routine-list/class-routine-list.component';
import { ExamRoutineListComponent } from './components/exam-routine-list/exam-routine-list.component';

@NgModule({
    declarations: [
        ClassRoutineFormComponent,
        ClassRoutineListComponent,
        ClassRoutineViewComponent,
        RoutineCellComponent,
        ExamRoutineFormComponent,
        ExamRoutineListComponent
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
                redirectTo: 'class/list'
            },
            {
                path: 'class',
                children: [
                    {
                        path: 'list',
                        component: ClassRoutineListComponent
                    },
                    {
                        path: 'create',
                        component: ClassRoutineFormComponent
                    },
                    {
                        path: 'view',
                        component: ClassRoutineViewComponent
                    },
                ]
            },
            {
                path: 'exam',
                children: [
                    {
                        path: 'list',
                        component: ExamRoutineListComponent
                    },
                    {
                        path: 'create',
                        component: ExamRoutineFormComponent
                    }
                ]
            }
        ]),
        MatMenuModule,
        MatChipsModule
    ]
})
export class RoutineModule {
}
