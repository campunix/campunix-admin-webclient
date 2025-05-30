import {Component, ViewChild} from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ListResponse, Response } from 'app/models/response';
import { Department } from 'app/models/department';
import { DepartmentsService } from 'app/modules/admin/departments/services/departments.service';
import { SyllabusService } from 'app/modules/syllabus/services/syllabus.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-class-routine-form',
    templateUrl: './class-routine-form.component.html',
    styleUrl: './class-routine-form.component.scss'
})
export class ClassRoutineFormComponent {

    isLoading: boolean = false;

    weekDays: string[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
    ];

    semesters: string[] = [];

    slots: string[] = [
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 1:00",
        "2:00 - 3:00",
        "3:00 - 4:00",
    ];

    genes: any[] = [];
    syllabuses: any[] = [];
    calendarYears: string[] = [];
    departments: Department[] = [];
    routineForm: UntypedFormGroup;
    syllabusId: number = 0;
    
    constructor(
        private fb: UntypedFormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar,
        private _deptService: DepartmentsService,
        private readonly _routineService: RoutineService,
        private readonly _syllabusService: SyllabusService,)
    {
    }

    ngOnInit(): void
    {
        this.routineForm = this.fb.group({
            department: this.fb.control('', Validators.required),
            syllabus: this.fb.control('', Validators.required),
            title: this.fb.control('', Validators.required),
            description: this.fb.control(''),
        });

        for(let i = 2023; i <= 2050; i++) {
            this.calendarYears.push(`${i} - ${i + 1}`);
        }

        this.getDepartments();
        
        this.routineForm.get("department").valueChanges.subscribe((departmentId) => {
            this.genes = [];
            this.routineForm.get("syllabus").setValue('');
            this.getSyllabuses(Number(departmentId));
        });

        this.routineForm.get("syllabus").valueChanges.subscribe((syllabus: any) => {
            if (!syllabus) return;

            console.log(syllabus.id);
            this.syllabusId = Number(syllabus.id);
            this.loadRoutine(this.syllabusId);
        });
    }

    reloadRoutine() {
        if (this.syllabusId) {
            this.loadRoutine(this.syllabusId);
        }
    }

    private getDepartments() {
        this._deptService.getAll().subscribe((response: Response<ListResponse<Department>>) => {
            this.departments = response.data.items ?? [];
        });
    }

    private getSyllabuses(departmentId: number) {
        this._syllabusService
        .getAllSyllabuses(departmentId)
        .subscribe((response: Response<ListResponse<any>>) => {
            this.syllabuses = response.data.items ?? [];
            console.log(this.syllabuses);
        });
    }

    private loadRoutine(syllabusId: number) {
        this.isLoading = true;
        this._routineService.getRoutine(syllabusId).subscribe((response: any) => {
            this.semesters = response?.semesters || [];
            this.genes = response?.routine?.genes || [];
            this.isLoading = false;
        });
    }

    onSubmit() {
        var formValues = this.routineForm.value;
        var data = {
            "syllabus_id": formValues.syllabus.id,
            "calendar_year": formValues.syllabus.calendar_year,
            "title": formValues.title,
            "description": formValues.description,
            "is_active": true,
            "routine": JSON.stringify({ genes: this.genes, semesters: this.semesters })
        }

        this._routineService.createClassRoutine(data).subscribe({
            next: () => {
                this._snackBar.open('Class routine created successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });

                this._router.navigate(['/routine/class/list']).then(() => {});
            },
            error: (error) => {
                this._snackBar.open('Failed: ' + error.message, 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });
            }
        });
    }
}
