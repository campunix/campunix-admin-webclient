import { Component, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeachersService } from '../../services/teachers.service';
import { Response } from '../../../../../models/response';
import { Teacher } from 'app/models/teacher';
import { Department } from 'app/models/department';
import { DepartmentsService } from 'app/modules/admin/departments/services/departments.service';
import { UserService } from 'app/shared/services/user.service';
import { User } from 'app/models/user';

@Component({
    selector: 'app-teachers-create',
    templateUrl: './teachers-create.component.html',
    styleUrls: ['./teachers-create.component.scss']
})
export class TeachersCreateComponent {
    teacher: Teacher = { id: 0, full_name: '', designation: '', email: '', status: '' };
    @ViewChild('teacherNgForm') teacherNgForm: NgForm;

    alert: any;
    teacherForm: UntypedFormGroup;
    users: any[] = [];
    departments: Department[] = [];
    designations: string[] = [];
    statuses: string[] = [];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private teachersService: TeachersService,
        private deptService: DepartmentsService,
        private userService: UserService,
        private router: Router
    ) { }

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
        this.deptService.getAll().subscribe((response: Response<Department[]>) => {
            this.departments = response?.data?.items || [];
        });
    }

    getAllUsers() {
        this.userService.getAll().subscribe((response: Response<User[]>) => {
            this.users = response?.data?.items || [];
        });
    }

    getAllDesignations() {
        this.teachersService.getAllDesignations().subscribe((response: Response<string[]>) => {
            this.designations = response?.data?.items || [];
        });
    }

    getAllStatuses() {
        this.teachersService.getAllStatuses().subscribe((response: Response<string[]>) => {
            this.statuses = response?.data?.items || [];
        });
    }

    createTeacher(): void {
        this.teachersService.create(this.teacherForm.value).subscribe(() => {
            this.router.navigate(['/teachers/list']).then(() => {
                this.teacherNgForm.resetForm();
            });
        });
    }

    clearForm(): void {
        this.teacherNgForm.resetForm();
    }
}
