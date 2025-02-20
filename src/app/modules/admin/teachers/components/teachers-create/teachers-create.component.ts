import { Component, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeachersService } from '../../services/teachers.service';
import { Response } from '../../../../../models/response';
import { Teacher } from 'app/models/teacher';
import { Department } from 'app/models/department';

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
    users: any[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@gmail.com'
        }
    ];
    departments: Department[] = [
        {
            id: 1,
            name: 'Computer Science',
            code: 'CS',
            organization_id: 1,
            created_by: 'John Doe'
        }
    ];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private teachersService: TeachersService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.teacherForm = this._formBuilder.group({
            user_id: ['', Validators.required],
            department_id: ['', Validators.required],
            designation: ['', Validators.required],
            status: ['ACTIVE', Validators.required]
        });
    }

    createTeacher(): void {
        this.teachersService.create(this.teacherForm.value).subscribe((response: Response<Teacher>) => {
            this.router.navigate(['/teachers/list']).then(() => {
                this.teacherNgForm.resetForm();
            });
        });
    }

    clearForm(): void {
        this.teacherNgForm.resetForm();
    }
}
