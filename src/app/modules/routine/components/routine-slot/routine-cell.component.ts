import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-routine-cell',
    templateUrl: './routine-cell.component.html',
    styleUrl: './routine-cell.component.scss'
})
export class RoutineCellComponent {

    @Input() totalSemesters: number;
    @Input() totalSlots: number;
    @Input() genes: any[];
    @Input() dayNumber: number;
    @Input() semesterNumber: number;
    @Input() slotNumber: number;

    selectedGene: any;

    ngOnInit(): void
    {

        let cellNumber = (this.dayNumber * (this.totalSemesters * this.totalSlots)) + (this.semesterNumber * this.totalSlots) + this.slotNumber;
        this.selectedGene = this.genes.find(x => x.cell_number == cellNumber);
        console.log(cellNumber)
    }
}
