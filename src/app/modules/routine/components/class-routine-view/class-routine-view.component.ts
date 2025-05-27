import {Component, ViewChild} from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SyllabusService } from 'app/modules/syllabus/services/syllabus.service';

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

    semesters: any[] = [
        {year: 1, number: 1},
        {year: 2, number: 1},
        {year: 3, number: 1},
        {year: 4, number: 1},
    ];

    slots: string[] = [
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 1:00",
        "2:00 - 3:00",
        "3:00 - 4:00",
    ];

    genes: any[] = [];
    private departmentId: number = 1;

    constructor(
        private route: ActivatedRoute,
        private readonly _syllabusService: SyllabusService,
        private readonly _routineService: RoutineService,
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            this.departmentId = id ? +id : 1;
            this.getRoutineById();
        });
    }

    private getRoutineById() {
        this._routineService.getRoutineById(this.departmentId).subscribe((response: any) => {
            this.genes = response?.data?.routine?.genes || [];
            this.isLoading = false;

            // this.getSyllabusById(response.data.syllabus_id);
        });
    }

    // getSyllabusById(syllabusId: number)
    // {
    //     this._syllabusService.get(syllabusId).subscribe(response => {
    //         console.log(response);
    //         this.semesters = response.data.syllabus.semesters;
    //     });
    // }
}
