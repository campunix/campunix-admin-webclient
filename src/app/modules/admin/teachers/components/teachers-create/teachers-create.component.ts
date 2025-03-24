import {Component, ViewChild} from '@angular/core';
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TeachersService} from '../../services/teachers.service';
import {ListResponse, Response} from '../../../../../models/response';
import {Teacher} from 'app/models/teacher';
import {Department} from 'app/models/department';
import {DepartmentsService} from 'app/modules/admin/departments/services/departments.service';
import {UserService} from 'app/shared/services/user.service';
import {User} from 'app/models/user';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-teachers-create',
    templateUrl: './teachers-create.component.html',
    styleUrls: ['./teachers-create.component.scss']
})
export class TeachersCreateComponent {
    @ViewChild('teacherNgForm') teacherNgForm: NgForm;

    alert: any;
    teacherForm: UntypedFormGroup;
    users: any[] = [];
    departments: Department[] = [];
    designations: string[] = [];
    statuses: string[] = [];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _teachersService: TeachersService,
        private _deptService: DepartmentsService,
        private _userService: UserService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.teacherForm = this._formBuilder.group({
            user_id: ['', Validators.required],
            department_id: ['', Validators.required],
            designation: ['', Validators.required],
            status: ['', Validators.required]
        });

        this.getDepartments();
        this.getAllUsers();
        this.getAllDesignations();
        this.getAllStatuses();
    }

    getDepartments() {
        this._deptService.getAll().subscribe(response => {
            this.departments = response?.data?.items ?? [];
        });
    }

    getAllUsers() {
        this._userService.getAll().subscribe((response: Response<ListResponse<User>>) => {
            this.users = response?.data?.items ?? [];
        });
    }

    getAllDesignations() {
        this._teachersService.getAllDesignations().subscribe((response: Response<ListResponse<string>>) => {
            this.designations = response.data.items ?? [];
        });
    }

    getAllStatuses() {
        this._teachersService.getAllStatuses().subscribe((response: Response<ListResponse<string>>) => {
            this.statuses = response.data.items ?? [];
        });
    }

    createTeacher(): void {
        this._teachersService.create(this.teacherForm.value).subscribe({
            next: () => {
                this._snackBar.open('Teacher created successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });

                this.router.navigate(['/teachers/list']).then(() => {
                    this.teacherNgForm.resetForm();
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
        this.teacherNgForm.resetForm();
    }
}
