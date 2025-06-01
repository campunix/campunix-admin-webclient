import { Component, ElementRef, ViewChild } from '@angular/core';
import { SyllabusService } from '../../services/syllabus.service';
import { Response } from 'app/models/response';
import { SyllabusData } from 'app/models/syllabus_data';
import ordinal from 'ordinal';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-syllabus-view',
  templateUrl: './syllabus-view.component.html',
  styleUrls: ['./syllabus-view.component.scss']
})
export class SyllabusViewComponent {

  isLoading: boolean = false;
  syllabusData: SyllabusData;
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  constructor(private _syllabusService: SyllabusService, private route: ActivatedRoute) {
    this.isLoading = true;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._syllabusService.get(+id).subscribe((response: Response<SyllabusData>) => {
        this.syllabusData = response.data;
        console.log(this.syllabusData);
        this.isLoading = false;
      });
    }
  }

  getOrdinal(num: number): string {
      return ordinal(num);
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
            pdf.save('syllabus.pdf');
        });
    }
}
