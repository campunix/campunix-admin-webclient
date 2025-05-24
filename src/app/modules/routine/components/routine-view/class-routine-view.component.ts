import {Component, ViewChild} from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    
    constructor(
        private _snackBar: MatSnackBar,
        private readonly _routineService: RoutineService)
    {
    }

    ngOnInit(): void
    {
        this.isLoading = true;
        var departmentId = 1;
        this._routineService.getRoutine(departmentId).subscribe((response: any) => {
            console.log(response);
            this.semesters = response?.semesters || [];
            this.genes = response?.routine?.genes || [];
            this.isLoading = false;
        });
    }
}
