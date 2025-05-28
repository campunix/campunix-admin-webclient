import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { FuseAlertComponent } from '../../../../@fuse/components/alert';
import {TeacherCoursesComponent} from "./components/teacher-courses-list/teacher-courses.component";
import {TeacherCoursesCreateComponent} from "./components/teacher-courses-create/teacher-courses-create.component";
import {PreferenceCreateComponent} from "../preferences/components/preference-create/preference-create.component";

@NgModule({
    declarations: [TeacherCoursesComponent, TeacherCoursesCreateComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatSortModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        MatRippleModule,
        MatMenuModule,
        FuseAlertComponent,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: TeacherCoursesComponent
            },
            {
                path: 'create',
                component: TeacherCoursesCreateComponent
            },
            {
                path: 'edit/:id',
                component: TeacherCoursesCreateComponent
            }
        ])
    ]
})
export class TeacherCoursesModule { }
