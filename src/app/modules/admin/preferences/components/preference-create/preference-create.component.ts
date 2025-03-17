import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ListResponse, Response, SingleItemResponse} from "../../../../../models/response";
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {PreferenceService} from "../../services/preference.service";
import {DepartmentsService} from "../../../departments/services/departments.service";
import {Department} from "../../../../../models/department";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Teacher} from "../../../../../models/teacher";
import {TeachersService} from "../../../teachers/services/teachers.service";

@Component({
    selector: 'app-preference-create',
    templateUrl: './preference-create.component.html',
    styleUrl: './preference-create.component.scss'
})
export class PreferenceCreateComponent implements OnInit {
    departments: Array<Department> = [];
    teachers: Array<Teacher> = [];
    days: Array<string> = [];
    slots: Array<number> = [1, 2, 3, 4, 5, 6];
    @ViewChild('preferenceNgForm') preferenceNgForm: NgForm;

    alert: any;
    preferenceForm: UntypedFormGroup;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private departmentsService: DepartmentsService,
        private teachersService: TeachersService,
        private preferenceService: PreferenceService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.preferenceForm = this._formBuilder.group({
            department_id: ['', Validators.required],
            teacher_id: ['', Validators.required],
            day: [[], Validators.required],
            slot_no: [[], Validators.required]
        });

        this.departmentsService.getAll().subscribe((response: Response<ListResponse<Department>>) => {
            this.departments = response.data.items ?? [];
        });

        this.preferenceService.getDays().subscribe((response: Response<ListResponse<string>>) => {
            this.days = response.data.items ?? [];
        });
    }

    getAllTeachers(department_id: number) {
        this.teachersService.getAll(department_id).subscribe((response: Response<ListResponse<Teacher>>) => {
            this.teachers = response?.data?.items ?? [];
        });
    }

    createPreference(): void {
        this.preferenceService.create(this.preferenceForm.value).subscribe({
            next: () => {
                this._snackBar.open('Preference created successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });

                this.router.navigate(['/preferences/list']).then(() => {
                    this.preferenceNgForm.resetForm();
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

    clearForm(): void {
        this.preferenceNgForm.resetForm();
    }
}
