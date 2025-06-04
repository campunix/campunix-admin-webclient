import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SyllabusUploadComponent } from './components/syllabus-upload/syllabus-upload.component';
import { SyllabusViewComponent } from './components/syllabus-view/syllabus-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SyllabusListComponent } from './components/syllabus-list/syllabus-list.component';
import { SyllabusFormComponent } from './components/syllabus-form/syllabus-form.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        SyllabusListComponent,
        SyllabusUploadComponent,
        SyllabusViewComponent,
        SyllabusFormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgIf,
        MatProgressBarModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
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
        MatSnackBarModule,
        MatIconModule,
        AsyncPipe,
        CurrencyPipe,
        RouterModule.forChild([
            {
                path: '',
                component: SyllabusListComponent
            },
            {
                path: 'create',
                component: SyllabusFormComponent
            },
            {
                path: ':id/view',
                component: SyllabusViewComponent
            },
            {
                path: 'upload',
                component: SyllabusUploadComponent
            },
        ]),
    ]
})
export class SyllabusModule { }