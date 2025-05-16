import {Component, ViewChild} from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ListResponse, Response } from 'app/models/response';
import { Department } from 'app/models/department';
import { DepartmentsService } from 'app/modules/admin/departments/services/departments.service';

@Component({
    selector: 'app-class-routine-create',
    templateUrl: './class-routine-create.component.html',
    styleUrl: './class-routine-create.component.scss'
})
export class ClassRoutineCreateComponent {

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
    departmentFormControl = new FormControl('');
    
    constructor(
        private _snackBar: MatSnackBar,
        private _deptService: DepartmentsService,
        private readonly _routineService: RoutineService)
    {
    }

    ngOnInit(): void
    {
        this.getDepartments();
        
        this.departmentFormControl.valueChanges.subscribe((departmentId) => {
            console.log(departmentId);
            this.loadRoutine(Number(departmentId));
        });
    }

    private getDepartments() {
        this._deptService.getAll().subscribe((response: Response<ListResponse<Department>>) => {
            this.departments = response.data.items ?? [];
        });
    }

    private loadRoutine(departmentId: number) {
        this.isLoading = true;
        this._routineService.getRoutine(departmentId).subscribe((response: any) => {
            console.log(response);
            this.semesters = response?.semesters || [];
            this.genes = response?.routine?.genes || [];
            this.isLoading = false;
        });
    }

    onSubmit() {
        var data = {
            "department_id": this.departmentFormControl.value,
            "title": "string",
            "description": "string",
            "calendar_year": "string",
            "is_active": true,
            "routine": JSON.stringify(this.genes)
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
