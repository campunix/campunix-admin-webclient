import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListResponse, Response} from "../../../../../models/response";
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
    isEditMode: boolean = false;
    roomId: number | null = null;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private deptService: DepartmentsService,
        private roomsService: RoomsService,
        private router: Router,
        private _snackBar: MatSnackBar,
        private route: ActivatedRoute
    ) {}

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

        // Edit compatibility
        this.route.paramMap.subscribe(params => {
            const idParam = params.get('id');
            if (idParam) {
                this.isEditMode = true;
                this.roomId = +idParam;
                this.roomsService.get(this.roomId).subscribe({
                    next: (response: Response<Room>) => {
                        this.roomForm.patchValue(response.data);
                    },
                    error: () => {
                        this._snackBar.open('Failed to load room data', 'Close', {
                            duration: 3000,
                            horizontalPosition: 'center',
                            verticalPosition: 'bottom'
                        });
                        this.router.navigate(['/rooms/list']);
                    }
                });
            }
        });
    }

    createRoom(): void {
        if (this.isEditMode) {
            this.updateRoom();
            return;
        }

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

    updateRoom(): void {
        if (this.roomId == null) return;

        this.roomsService.update(this.roomId, this.roomForm.value).subscribe({
            next: () => {
                this._snackBar.open('Room updated successfully', 'Close', {
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
        if (this.isEditMode && this.roomId) {
            this.roomsService.get(this.roomId).subscribe({
                next: (response: Response<Room>) => {
                    this.roomForm.patchValue(response.data);
                },
                error: () => {
                    this._snackBar.open('Failed to load room data', 'Close', {
                        duration: 3000,
                        horizontalPosition: 'center',
                        verticalPosition: 'bottom'
                    });
                    this.router.navigate(['/rooms/list']);
                }
            });
        }
    }
}
