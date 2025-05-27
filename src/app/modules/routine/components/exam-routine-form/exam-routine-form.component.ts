import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'app/models/course';
import { Teacher } from 'app/models/teacher';
import { CourseService } from 'app/modules/admin/courses/services/course.service';
import { TeachersService } from 'app/modules/admin/teachers/services/teachers.service';
import { RoutineService } from '../../services/routine.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DepartmentsService } from 'app/modules/admin/departments/services/departments.service';
import { Department } from 'app/models/department';
import { SyllabusService } from 'app/modules/syllabus/services/syllabus.service';
import { ListResponse, Response } from 'app/models/response';

@Component({
    selector: 'app-exam-routine-form',
    templateUrl: './exam-routine-form.component.html',
    styleUrls: ['./exam-routine-form.component.scss']
})
export class ExamRoutineFormComponent implements OnInit {
    routineForm: FormGroup;
    
    timeSlots: string[] = [
        "10:00 AM - 1:00 PM",
        "2:00 PM - 5:00 PM",
    ];
    selectedTeachers: { [key: number]: string[] } = {};
    departments: Department[] = [];
    syllabuses: any[] = [];
    courses: Course[] = [];
    teachers: Teacher[] = [];
    calendarYears: string[] = [];

    constructor(
        private readonly fb: FormBuilder,
        private readonly _courseService: CourseService,
        private readonly _teachersService: TeachersService,
        private readonly _routineService: RoutineService,
        private readonly _deptService: DepartmentsService,
        private readonly _syllabusService: SyllabusService,
        private readonly _snackBar: MatSnackBar,
        private readonly _router: Router,
    ) {}

    ngOnInit(): void {
        this.routineForm = this.fb.group({
            department: this.fb.control('', Validators.required),
            syllabus: this.fb.control('', Validators.required),
            title: this.fb.control('', Validators.required),
            description: this.fb.control(''),
            routineEntries: this.fb.array([])
        });
        this.addEntry();

        for(let i = 2023; i <= 2050; i++) {
            this.calendarYears.push(`${i} - ${i + 1}`);
        }

        this.getDepartments();
        
        this.routineForm.get('department').valueChanges.subscribe((departmentId) => {
            this.routineForm.get('syllabus').setValue('');
            this.getSyllabuses(Number(departmentId));
            this.loadTeachers();
        });

        this.routineForm.get('syllabus').valueChanges.subscribe((syllabusId) => {
            if (!syllabusId) return;
            this.loadCourses();
        });
    }

    get routineEntries() {
        return this.routineForm.get('routineEntries') as FormArray;
    }

    addEntry() {
        const entry = this.fb.group({
            date: ['', Validators.required],
            course: ['', Validators.required],
            teacher: [''],
            timeSlot: ['', Validators.required],
        });
        this.routineEntries.push(entry);

        entry.get('course').valueChanges.subscribe((course) => {
            const index = this.routineEntries.controls.findIndex(ctrl => ctrl === entry);

            this.selectedTeachers[index] = [];
            course["course_teachers"] ??= [];
            course["course_teachers"].forEach((teacher: any) => {
                if (!this.selectedTeachers[index].includes(teacher)) {
                    this.selectedTeachers[index].push(teacher);
                }
            });
        });
    }

    removeEntry(index: number) {
        var totalEntries = this.routineEntries.length;
        for (let i = index; i < totalEntries-1; i++) {
            this.selectedTeachers[i] = this.selectedTeachers[i + 1];
        }
        this.selectedTeachers[totalEntries - 1] = [];
        this.routineEntries.removeAt(index);
    }

    addTeacher(index: number): void {
        const teacherControl = this.routineEntries.at(index).get('teacher');
        const selectedTeacher = teacherControl.value;
        
        if (!selectedTeacher) {
            return;
        }

        this.selectedTeachers[index] ??= [];
        if (!this.selectedTeachers[index].find((x: any) => x.id === selectedTeacher.id)) {
            this.selectedTeachers[index].push(selectedTeacher);
            teacherControl.setValue('');
        }
    }

    removeTeacher(index: number, teacher: string): void {
        const teacherIndex = this.selectedTeachers[index].indexOf(teacher);
        if (teacherIndex >= 0) {
            this.selectedTeachers[index].splice(teacherIndex, 1);
        }
    }

    onSubmit() {
        var routineRows = [];
        this.routineForm.value["routineEntries"].forEach((element, index) => {
            var examRoutineRow = new ExamRoutineRow();
            examRoutineRow.date = element.date;
            examRoutineRow.timeSlot = element.timeSlot;
            examRoutineRow.course = {
                id: element.course.id,
                title: element.course.title
            };
            examRoutineRow.teachers = [];
            if (this.selectedTeachers[index]) {
                this.selectedTeachers[index].forEach((teacher: any) => {
                    examRoutineRow.teachers.push({
                        id: teacher.id,
                        name: teacher.full_name
                    });
                });
            }

            if (element.teacher)
            {
                examRoutineRow.teachers.push({
                    id: element.teacher.id,
                    name: element.teacher.full_name
                });
            }

            routineRows.push(examRoutineRow);
        });

        var formValues = this.routineForm.value;
        var examRoutine = new ExamRoutine();
        examRoutine.syllabus_id = formValues.syllabus.id;
        examRoutine.calendar_year = formValues.syllabus.calendar_year;
        examRoutine.title = formValues.title;
        examRoutine.description = formValues.description;
        examRoutine.is_active = true;
        examRoutine.exam_routine = JSON.stringify({routine: routineRows});

        this._routineService.createExamRoutine(examRoutine).subscribe({
            next: () => {
                this._snackBar.open('Exam routine created successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });

                this._router.navigate(['/routine/exam/list']).then(() => {});
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

    private getDepartments() {
        this._deptService.getAll()
        .subscribe((response: Response<ListResponse<Department>>) => {
            this.departments = response.data.items ?? [];
        });
    }

    private getSyllabuses(departmentId: number) {
            this._syllabusService
            .getAllSyllabuses(departmentId)
            .subscribe((response: Response<ListResponse<any>>) => {
                this.syllabuses = response.data.items ?? [];
                console.log(this.syllabuses);
            });
        }

    // loadCourses(syllabus_id: Number) {
    //     this._syllabusService
    //         .getSyllabusCourses(syllabus_id)
    //         .subscribe((response: any) => {
    //             this.courses = (response.data ?? []).map((item: any) => {
    //                 return item.course;
    //             });
    //         });
    // }

    loadCourses(searchQuery: string = '') {
        const page = 1;
        const pageSize = 100;

        this._courseService
            .getAllPaginated(page, pageSize, searchQuery)
            .subscribe((response) => {
                if (response?.status && response?.data) {
                    this.courses = response.data.items ?? [];
                } else {
                    this.courses = [];
                }
            });
    }

    loadTeachers(searchQuery: string = '') {
        const page = 1;
        const pageSize = 100;

        this._teachersService
            .getAllPaginated(page, pageSize, searchQuery)
            .subscribe({
                next: (response) => {
                    if (response?.status && response?.data) {
                        this.teachers = response.data.items ?? [];
                    } else {
                        this.teachers = [];
                    }
                }
            });
    }

}

class ExamRoutineRow 
{
    date: string;
    timeSlot: string;
    teachers: any[];
    course: any;
}

class ExamRoutine 
{
    syllabus_id: number;
    title: string;
    description: string;
    calendar_year: string;
    is_active: boolean;
    exam_routine: string;
}