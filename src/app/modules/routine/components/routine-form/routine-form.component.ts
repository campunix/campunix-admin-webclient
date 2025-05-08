import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

@Component({
    selector: 'app-routine-form',
    templateUrl: './routine-form.component.html',
    styleUrls: ['./routine-form.component.scss']
})
export class RoutineFormComponent implements OnInit {
    routineForm: FormGroup;
    
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'];
    teachers = ['Teacher 1', 'Teacher 2', 'Teacher 3'];
    courses = ['Course 1', 'Course 2', 'Course 3'];
    selectedTeachers: { [key: number]: string[] } = {};

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.routineForm = this.fb.group({
            routineEntries: this.fb.array([])
        });
        this.addEntry();
    }

    get routineEntries() {
        return this.routineForm.get('routineEntries') as FormArray;
    }

    addEntry() {
        const entry = this.fb.group({
            day: ['', Validators.required],
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
        if (this.routineForm.valid) {
            console.log(this.routineForm.value);
        }
    }
}
