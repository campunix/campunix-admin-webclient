import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ListResponse, Response, SingleItemResponse} from "../../../../../models/response";
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../services/course.service";
import {Course} from "../../../../../models/course";
import {DepartmentsService} from "../../../departments/services/departments.service";
import {Department} from "../../../../../models/department";

@Component({
    selector: 'app-course-create',
    templateUrl: './course-create.component.html',
    styleUrl: './course-create.component.scss'
})
export class CourseCreateComponent implements OnInit {
    course: Course = {id: 0, title: '', code: '', department_id: 0, course_type: ''};
    departments: Array<Department> = [];
    courseTypes: Array<string> = [];
    @ViewChild('roomNgForm') roomNgForm: NgForm;

    alert: any;
    courseForm: UntypedFormGroup;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private deptService: DepartmentsService,
        private courseService: CourseService,
        private router: Router
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
        this.courseService.create(this.courseForm.value).subscribe((response: Response<SingleItemResponse<Course>>) => {
            this.router.navigate(['/courses/list']).then(() => {
                this.roomNgForm.resetForm();
            });
        });
    }

    clearForm(): void {
        this.roomNgForm.resetForm();
    }
}
