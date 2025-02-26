import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ListResponse, Response, SingleItemResponse} from "../../../../../models/response";
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {RoomsService} from "../../services/rooms.service";
import {Room} from "../../../../../models/room";
import {DepartmentsService} from "../../../departments/services/departments.service";
import {Department} from "../../../../../models/department";

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
        private router: Router
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
        this.roomsService.create(this.roomForm.value).subscribe((response: Response<SingleItemResponse<Room>>) => {
            this.router.navigate(['/rooms/list']).then(() => {
                this.roomNgForm.resetForm();
            });
        });
    }

    clearForm(): void {
        this.roomNgForm.resetForm();
    }
}
