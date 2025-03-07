import {Component, ViewChild} from '@angular/core';
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ListResponse, Response} from '../../../../../models/response';
import {Teacher} from 'app/models/teacher';
import {Department} from 'app/models/department';
import {DepartmentsService} from 'app/modules/admin/departments/services/departments.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TeacherCoursesService} from "../../services/teacher-courses.service";
import {Course} from "../../../../../models/course";
import {TeachersService} from "../../../teachers/services/teachers.service";
import {CourseService} from "../../../courses/services/course.service";
import {TeacherCourseIn} from "../../../../../models/teacher-courses";

@Component({
    selector: 'app-teacher-courses-create',
    templateUrl: './teacher-courses-create.component.html',
    styleUrls: ['./teacher-courses-create.component.scss']
})
export class TeacherCoursesCreateComponent {
    @ViewChild('teacherCoursesNgForm') teacherCoursesNgForm: NgForm;

    alert: any;
    teacherCoursesForm: UntypedFormGroup;
    departments: Department[] = [];
    courses: Course[] = [];
    teachers: Teacher[] = [];
    teachersId:number[] = [];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _teacherCoursesService: TeacherCoursesService,
        private _deptService: DepartmentsService,
        private _teacherService: TeachersService,
        private _courseService: CourseService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.teacherCoursesForm = this._formBuilder.group({
            department_id: ['', Validators.required],
            course_id: ['', Validators.required],
            teacher_id: ['', Validators.required]
        });

        this.getDepartments();
    }

    getDepartments() {
        this._deptService.getAll().subscribe(response => {
            this.departments = response?.data?.items ?? [];
        });
    }

    getAllCourses(department_id: number) {
        this._courseService.getAll(department_id).subscribe((response: Response<ListResponse<Course>>) => {
            this.courses = response?.data?.items ?? [];
        });
    }

    getAllTeachers(department_id: number) {
        this._teacherService.getAll(department_id).subscribe((response: Response<ListResponse<Teacher>>) => {
            this.teachers = response?.data?.items ?? [];
        });
    }

    createTeacherCourses(): void {
        const teacherCourse: TeacherCourseIn = {
            course_id: this.teacherCoursesForm.value.course_id,
            teacher_ids: this.teacherCoursesForm.value.teacher_id
        };

        this._teacherCoursesService.create(teacherCourse).subscribe({
            next: () => {
                this._snackBar.open('Teacher Course created successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });

                this.router.navigate(['/teacherCourses/list']).then(() => {
                    this.teacherCoursesNgForm.resetForm();
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
        this.teacherCoursesNgForm.resetForm();
    }
}
