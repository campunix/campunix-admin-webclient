import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-exam-routine-view',
    templateUrl: './exam-routine-view.component.html',
    styleUrls: ['./exam-routine-view.component.scss']
})
export class ExamRoutineViewComponent implements OnInit {

    private routineId: number = 1;
    isLoading: boolean = false;
    routineData: any = {};
    @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

    constructor(
        private route: ActivatedRoute,
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