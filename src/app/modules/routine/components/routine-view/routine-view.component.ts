import {Component, ViewChild} from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

    onSubmit() {
        var data = {
            "syllabus_id": 1,
            "title": "string",
            "description": "string",
            "calendar_year": "string",
            "is_active": false,
            "routine": this.genes
        }

        this._routineService.createClassRoutine(data).subscribe({
            next: () => {
                this._snackBar.open('Class routine created successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });
            },
            error: (error) => {
                this._snackBar.open('Failed: ' + error.message, 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });
            }
        });
    }
}
