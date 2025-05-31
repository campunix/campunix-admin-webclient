import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'app/models/course';
import { Teacher } from 'app/models/teacher';
import { RoutineService } from '../../services/routine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'app/models/department';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-exam-routine-view',
    templateUrl: './exam-routine-view.component.html',
    styleUrls: ['./exam-routine-view.component.scss']
})
export class ExamRoutineViewComponent implements OnInit {
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

    private routineId: number = 1;
    isLoading: boolean = false;
    routineData: any = {};
    @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private readonly fb: FormBuilder,
        private readonly _routineService: RoutineService
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            this.routineId = id ? +id : 1;
            this.getRoutineById();
        });
    }

    private getRoutineById() {
        this._routineService.getExamRoutineById(this.routineId).subscribe((response: any) => {
            this.routineData = response?.data || {};
            this.isLoading = false;
        });
    }

    downloadPDF(): void {
        const DATA = this.pdfContent.nativeElement;

        html2canvas(DATA, {scale: 2, useCORS: true}).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            const pdfWidth = DATA.offsetWidth;
            const pdfHeight = DATA.offsetHeight;

            // Convert px to mm (1 px = 0.264583 mm)
            const mmWidth = pdfWidth * 0.264583;
            const mmHeight = pdfHeight * 0.264583;

            const pdf = new jsPDF({
                orientation: mmWidth > mmHeight ? 'l' : 'p',
                unit: 'mm',
                format: [mmWidth, mmHeight],
            });

            pdf.addImage(imgData, 'PNG', 0, 0, mmWidth, mmHeight);
            pdf.save('exam-routine.pdf');
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