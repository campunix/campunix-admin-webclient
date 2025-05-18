import {Component, ViewChild} from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ListResponse, Response } from 'app/models/response';
import { Department } from 'app/models/department';
import { DepartmentsService } from 'app/modules/admin/departments/services/departments.service';
import { SyllabusService } from 'app/modules/syllabus/services/syllabus.service';

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

    semesters: string[] = [
        "1-1",
        "2-1",
        "3-1",
        "4-1",
    ];

    slots: string[] = [
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 1:00",
        "2:00 - 3:00",
        "3:00 - 4:00",
    ];

    genes: any[] = [];
    departments: Department[] = [];
    syllabuses: any[] = [];
    departmentFormControl = new FormControl('');
    syllabusFormControl = new FormControl('');
    
    constructor(
        private _snackBar: MatSnackBar,
        private _deptService: DepartmentsService,
        private readonly _routineService: RoutineService,
        private readonly _syllabusService: SyllabusService,)
    {
    }

    ngOnInit(): void
    {
        this.getDepartments();
        
        this.departmentFormControl.valueChanges.subscribe((departmentId) => {
            this.genes = [];
            this.syllabusFormControl.setValue('');
            this.getSyllabuses(Number(departmentId));
        });

        this.syllabusFormControl.valueChanges.subscribe((syllabusId) => {
            if (!syllabusId) return;

            console.log(syllabusId);
            this.loadRoutine(Number(syllabusId));
        });
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
            console.log(response);
            this.semesters = response?.semesters || [];
            this.genes = response?.routine?.genes || [];
            this.isLoading = false;
        });
    }

    onSubmit() {
        var data = {
            "syllabus_id": this.syllabusFormControl.value,
            "title": "Sample routine",
            "description": "Sample description",
            "calendar_year": "2025",
            "is_active": true,
            "routine": JSON.stringify({ routine: this.genes })
        }

        this._routineService.createClassRoutine(data).subscribe({
            next: () => {
                this._snackBar.open('Class routine created successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });
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
