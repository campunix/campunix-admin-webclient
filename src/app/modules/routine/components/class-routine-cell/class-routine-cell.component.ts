import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-class-routine-cell',
    templateUrl: './class-routine-cell.component.html',
    styleUrl: './class-routine-cell.component.scss'
})
export class ClassRoutineCellComponent {

    @Input() totalSemesters: number;
    @Input() totalSlots: number;
    @Input() genes: any[];
    @Input() dayNumber: number;
    @Input() semesterNumber: number;
    @Input() slotNumber: number;

    selectedGene: any;
    previousGene: any;

    ngOnInit(): void
    {
        let cellNumber = (this.dayNumber * (this.totalSemesters * this.totalSlots)) + (this.semesterNumber * this.totalSlots) + this.slotNumber;
        this.selectedGene = this.genes.find(x => x.cell_number == cellNumber);
        this.previousGene = this.genes.find(x => x.cell_number == cellNumber - 1);
    }
}
