import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Course } from 'app/models/course';
import { Department } from 'app/models/department';
import { ListResponse, Response } from 'app/models/response';
import { CourseService } from 'app/modules/admin/courses/services/course.service';
import { DepartmentsService } from 'app/modules/admin/departments/services/departments.service';
import { SyllabusService } from '../../services/syllabus.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-syllabus-form',
  templateUrl: './syllabus-form.component.html',
  styleUrls: ['./syllabus-form.component.scss']
})
export class SyllabusFormComponent implements OnInit {
  syllabusForm: FormGroup;
  isLoading: boolean = false;
  courseList: Course[] = [];
  departments: Department[] = [];
  calendarYears: string[] = [];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _courseService: CourseService,
    private _deptService: DepartmentsService,
    private _syllabusService: SyllabusService
  ) {}

  ngOnInit(): void {
    this.syllabusForm = this._fb.group({
      department_id: [0, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      calendar_year: ['', Validators.required],
      is_active: [true],
      semesters: this._fb.array([])
    });

    for(let i = 2023; i <= 2050; i++) {
            this.calendarYears.push(`${i} - ${i + 1}`);
        }

    this.loadDepartments();

    this.syllabusForm.get('department_id').valueChanges.subscribe((departmentId) => {
      this.loadCourses(Number(departmentId));
    });
  }

  get semesters(): FormArray {
    return this.syllabusForm.get('semesters') as FormArray;
  }

  addSemester() {
    this.semesters.push(this._fb.group({
      id: [0, Validators.required],
      courses: this._fb.array([])
    }));
  }

  removeSemester(index: number) {
    this.semesters.removeAt(index);
  }

  courses(semesterIndex: number): FormArray {
    return (this.semesters.at(semesterIndex).get('courses') as FormArray);
  }

  addCourse(semesterIndex: number) {
    this.courses(semesterIndex).push(this._fb.group({
      id: [0, Validators.required],
      credit: [0, Validators.required],
      prerequisite: [''],
      contact_hours: [0],
      rationale: [''],
      course_objectives: this._fb.array([]),
      outcomes: this._fb.array([]),
      course_description: this._fb.array([]),
      recommended_books: this._fb.array([]),
      hardware_software_requirements: this._fb.group({
        HW: [''],
        SW: ['']
      })
    }));
  }

  removeCourse(semesterIndex: number, courseIndex: number) {
    this.courses(semesterIndex).removeAt(courseIndex);
  }

  // Helpers for dynamic arrays inside courses
  getCourseArray(semesterIndex: number, courseIndex: number, key: string): FormArray {
    return this.courses(semesterIndex).at(courseIndex).get(key) as FormArray;
  }

  addArrayItem(semesterIndex: number, courseIndex: number, key: string) {
    this.getCourseArray(semesterIndex, courseIndex, key).push(this._fb.control(''));
  }

  removeArrayItem(semesterIndex: number, courseIndex: number, key: string, idx: number) {
    this.getCourseArray(semesterIndex, courseIndex, key).removeAt(idx);
  }

  private loadDepartments() {
      this._deptService.getAll()
      .subscribe((response: Response<ListResponse<Department>>) => {
          this.departments = response.data.items ?? [];
      });
  }

  private loadCourses(departmentId: number) {
      this._courseService.getAll(departmentId)
        .subscribe((response: Response<ListResponse<Course>>) => {
            this.courseList = response?.data?.items ?? [];
        });
  }

  onSubmit() {
    if (this.syllabusForm.valid) {
      console.log(this.syllabusForm.value);
      
      this._syllabusService.create(this.syllabusForm.value).subscribe({
            next: () => {
                this._snackBar.open('Syllabus is created successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });

                this._router.navigate(['/syllabus']).then(() => {});
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
}