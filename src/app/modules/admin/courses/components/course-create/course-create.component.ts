import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ListResponse, Response} from "../../../../../models/response";
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../services/course.service";
import {Course} from "../../../../../models/course";
import {DepartmentsService} from "../../../departments/services/departments.service";
import {Department} from "../../../../../models/department";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-course-create',
    templateUrl: './course-create.component.html',
    styleUrl: './course-create.component.scss'
})
export class CourseCreateComponent implements OnInit {
    course: Course = {id: 0, title: '', code: '', department_id: 0, course_type: ''};
    departments: Array<Department> = [];
    courseTypes: Array<string> = [];
    @ViewChild('courseNgForm') courseNgForm: NgForm;

    alert: any;
    courseForm: UntypedFormGroup;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private deptService: DepartmentsService,
        private courseService: CourseService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.courseForm = this._formBuilder.group({
            title: ['', Validators.required],
            code: ['', [Validators.required]],
            department_id: ['', [Validators.required]],
            course_type: ['', [Validators.required]],
        });

        this.deptService.getAll().subscribe((response: Response<ListResponse<Department>>) => {
            this.departments = response.data.items ?? [];
        });

        this.courseService.getCourseTypes().subscribe((response: Response<ListResponse<string>>) => {
            this.courseTypes = response.data.items ?? [];
        });
    }

    createCourse(): void {
        this.courseService.create(this.courseForm.value).subscribe({
            next: () => {
                this._snackBar.open('Course created successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });

                this.router.navigate(['/courses/list']).then(() => {
                    this.courseNgForm.resetForm();
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
        this.courseNgForm.resetForm();
    }
}
