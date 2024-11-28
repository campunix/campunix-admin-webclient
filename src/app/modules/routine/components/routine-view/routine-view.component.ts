import {Component, ViewChild} from '@angular/core';
import { RoutineService } from '../../services/routine.service';

@Component({
    selector: 'app-routine-view',
    templateUrl: './routine-view.component.html',
    styleUrl: './routine-view.component.scss'
})
export class RoutineViewComponent {

    isLoading: boolean = false;

    weekDays: string[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
    ];

    semesters: string[] = [
        "1-1",
        "2-1",
        "3-1",
        "4-1",
    ];

    slots: string[] = [
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 1:00",
        "2:00 - 3:00",
        "3:00 - 4:00",
    ];

    genes: any[] = [];

    constructor(private readonly routineService: RoutineService)
    {
    }

    ngOnInit(): void
    {
        this.isLoading = true;
        this.routineService.getRoutine().subscribe((response: any) => {
            console.log(response);
            this.semesters = response?.semesters || [];
            this.genes = response?.routine?.genes || [];
            this.isLoading = false;
        });
    }

    getGeneByCellNumber(i, j, k) {
        let cellNumber = (i * (this.semesters.length * this.slots.length)) + (j * this.slots.length) + k;
        return this.genes.find(x => x.cell_number == cellNumber);
    }
}
