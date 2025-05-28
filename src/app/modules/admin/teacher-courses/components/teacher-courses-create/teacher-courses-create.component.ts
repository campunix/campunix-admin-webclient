import { Component, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListResponse, Response } from '../../../../../models/response';
import { Teacher } from 'app/models/teacher';
import { Department } from 'app/models/department';
import { DepartmentsService } from 'app/modules/admin/departments/services/departments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeacherCoursesService } from "../../services/teacher-courses.service";
import { Course } from "../../../../../models/course";
import { TeachersService } from "../../../teachers/services/teachers.service";
import { CourseService } from "../../../courses/services/course.service";
import {TeacherCourseIn, TeacherCourses, TeacherCoursesCustom} from "../../../../../models/teacher-courses";
import {Preference} from "../../../../../models/preference";

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

    // Edit mode state
    isEditMode = false;
    teacherCourseId: number | null = null;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _teacherCoursesService: TeacherCoursesService,
        private _deptService: DepartmentsService,
        private _teacherService: TeachersService,
        private _courseService: CourseService,
        private router: Router,
        private route: ActivatedRoute,
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

        // Detect edit mode by route param
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.isEditMode = true;
                this.teacherCourseId = +id;
                this.loadTeacherCourse(this.teacherCourseId);
            }
        });
    }

    loadTeacherCourse(id: number): void {
        this._teacherCoursesService.get(id).subscribe({
            next: (response: Response<TeacherCoursesCustom>) => {
                // Assuming API returns course_id, teacher_ids (array), and department_id
                const data: TeacherCoursesCustom = response?.data;
                if (data) {
                    this.teacherCoursesForm.patchValue({
                        department_id: data.department_id,
                        course_id: data.course_id,
                        teacher_id: data.teachers
                    });
                    // Load courses and teachers for department
                    this.getAllCourses(data.department_id);
                    this.getAllTeachers(data.department_id);
                }
            },
            error: () => {
                this._snackBar.open('Failed to load Teacher Course', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });
                this.router.navigate(['/teacherCourses/list']);
            }
        });
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

    saveTeacherCourses(): void {
        const teacherCourse: TeacherCourseIn = {
            course_id: this.teacherCoursesForm.value.course_id,
            teacher_ids: this.teacherCoursesForm.value.teacher_id
        };

        if (this.isEditMode && this.teacherCourseId) {
            this._teacherCoursesService.update(this.teacherCourseId, teacherCourse).subscribe({
                next: () => {
                    this._snackBar.open('Teacher Course updated successfully', 'Close', {
                        duration: 3000,
                        horizontalPosition: 'center',
                        verticalPosition: 'bottom'
                    });

                    this.router.navigate(['/teacherCourses/list']).then(() => {
                        this.teacherCoursesNgForm.resetForm();
                    });
                },
                error: (error) => {
                    this._snackBar.open('Update failed: ' + error.message, 'Close', {
                        duration: 3000,
                        horizontalPosition: 'center',
                        verticalPosition: 'bottom'
                    });
                }
            });
        } else {
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
    }

    clearForm(): void {
        this.teacherCoursesNgForm.resetForm();
        if (this.isEditMode && this.teacherCourseId) {
            this.loadTeacherCourse(this.teacherCourseId);
        }
    }
}
