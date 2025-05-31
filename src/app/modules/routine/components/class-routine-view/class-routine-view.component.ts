import {Component, ElementRef, ViewChild} from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { ActivatedRoute } from '@angular/router';
import { SyllabusService } from 'app/modules/syllabus/services/syllabus.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-class-routine-view',
    templateUrl: './class-routine-view.component.html',
    styleUrl: './class-routine-view.component.scss'
})
export class ClassRoutineViewComponent {

    isLoading: boolean = false;

    weekDays: string[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
    ];

    semesters: any[] = [];

    slots: string[] = [
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 1:00",
        "2:00 - 3:00",
        "3:00 - 4:00",
    ];

    routineData: any = {};
    genes: any[] = [];
    private routineId: number = 1;
    @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private readonly _syllabusService: SyllabusService,
        private readonly _routineService: RoutineService,
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
        this._routineService.getClassRoutineById(this.routineId).subscribe((response: any) => {
            this.routineData = response?.data || {};
            this.semesters = this.routineData?.routine?.semesters || [];
            this.genes = this.routineData?.routine?.genes || [];
            this.isLoading = false;
        });
    }

    // getSyllabusById(syllabusId: number)
    // {
    //     this._syllabusService.get(syllabusId).subscribe(response => {
    //         console.log(response);
    //         this.semesters = response.data.syllabus.semesters;
    //     });
    // }

    downloadPDF(): void {
        const DATA = this.pdfContent.nativeElement;

        html2canvas(DATA).then((canvas) => {
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
            pdf.save('class-routine.pdf');
        });
    }
}

