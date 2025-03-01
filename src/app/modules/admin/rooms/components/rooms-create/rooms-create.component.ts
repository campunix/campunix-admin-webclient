import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ListResponse, Response, SingleItemResponse} from "../../../../../models/response";
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {RoomsService} from "../../services/rooms.service";
import {Room} from "../../../../../models/room";
import {DepartmentsService} from "../../../departments/services/departments.service";
import {Department} from "../../../../../models/department";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-rooms-create',
    templateUrl: './rooms-create.component.html',
    styleUrl: './rooms-create.component.scss'
})
export class RoomsCreateComponent implements OnInit {
    room: Room = {id: 0, name: '', code: '', department_id: 0, room_type: ''};
    departments: Array<Department> = [];
    roomTypes: Array<string> = [];
    @ViewChild('roomNgForm') roomNgForm: NgForm;

    alert: any;
    roomForm: UntypedFormGroup;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private deptService: DepartmentsService,
        private roomsService: RoomsService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.roomForm = this._formBuilder.group({
            name: ['', Validators.required],
            code: ['', [Validators.required]],
            department_id: ['', [Validators.required]],
            room_type: ['', [Validators.required]],
        });

        this.deptService.getAll().subscribe((response: Response<ListResponse<Department>>) => {
            this.departments = response.data.items ?? [];
        });

        this.roomsService.getRoomTypes().subscribe((response: Response<ListResponse<string>>) => {
            this.roomTypes = response.data.items ?? [];
        });
    }

    createRoom(): void {
        this.roomsService.create(this.roomForm.value).subscribe({
            next: () => {
                this._snackBar.open('Room created successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });

                this.router.navigate(['/rooms/list']).then(() => {
                    this.roomNgForm.resetForm();
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

    clearForm(): void {
        this.roomNgForm.resetForm();
    }
}
