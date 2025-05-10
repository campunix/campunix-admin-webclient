import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { Course } from 'app/models/course';
import { Teacher } from 'app/models/teacher';
import { CourseService } from 'app/modules/admin/courses/services/course.service';
import { TeachersService } from 'app/modules/admin/teachers/services/teachers.service';

@Component({
    selector: 'app-routine-form',
    templateUrl: './routine-form.component.html',
    styleUrls: ['./routine-form.component.scss']
})
export class RoutineFormComponent implements OnInit {
    routineForm: FormGroup;
    
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'];
    selectedTeachers: { [key: number]: string[] } = {};
    courses: Course[] = [];
    teachers: Teacher[] = [];

    constructor(
        private fb: FormBuilder,
        private courseService: CourseService,
        private teachersService: TeachersService
    ) {}

    ngOnInit(): void {
        this.routineForm = this.fb.group({
            routineEntries: this.fb.array([])
        });
        this.addEntry();
        this.loadCourses();
        this.loadTeachers();
    }

    get routineEntries() {
        return this.routineForm.get('routineEntries') as FormArray;
    }

    addEntry() {
        const entry = this.fb.group({
            date: ['', Validators.required],
            timeSlot: ['', Validators.required],
            teacher: ['', Validators.required],
            course: ['', Validators.required]
        });
        this.routineEntries.push(entry);
    }

    removeEntry(index: number) {
        this.routineEntries.removeAt(index);
    }

    addTeacher(index: number): void {
        const teacherControl = this.routineEntries.at(index).get('teacher');
        const selectedTeacher = teacherControl.value;
        
        if (selectedTeacher) {
            if (!this.selectedTeachers[index]) {
                this.selectedTeachers[index] = [];
            }
            
            if (!this.selectedTeachers[index].includes(selectedTeacher)) {
                this.selectedTeachers[index].push(selectedTeacher);
                teacherControl.setValue(''); // Clear the select after adding
            }
        }
    }

    removeTeacher(index: number, teacher: string): void {
        const teacherIndex = this.selectedTeachers[index].indexOf(teacher);
        if (teacherIndex >= 0) {
            this.selectedTeachers[index].splice(teacherIndex, 1);
        }
    }

    onSubmit() {
        console.log(this.routineForm.value);
    }

    loadCourses(searchQuery: string = '') {
        const page = 1;
        const pageSize = 100;

        this.courseService
            .getAllPaginated(page, pageSize, searchQuery)
            .subscribe({
                next: (response) => {
                    if (response?.status && response?.data) {
                        this.courses = response.data.items ?? [];
                    } else {
                        this.courses = [];
                    }
                }
            });
    }

    loadTeachers(searchQuery: string = '') {
        const page = 1;
        const pageSize = 100;

        this.teachersService
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
