import {Component, OnInit, ViewChild} from '@angular/core';
import {Response} from "../../../../../models/response";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Pagination} from "../../../../../models/pagination";
import {Room} from "../../../../../models/room";
import {RoomsService} from "../../services/rooms.service";

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrl: './rooms.component.scss',
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `,
    ],
    animations: fuseAnimations,
})
export class RoomsComponent implements OnInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    searchInputControl = new FormControl('');
    rooms: Room[] = [];
    isLoading: boolean = false;
    pagination: Pagination = {
        length: 10,
        size: 10,
        page: 0,
        lastPage: 10,
        startIndex: 0,
        endIndex: 9,
    };

    constructor(private roomsService: RoomsService, private router: Router) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.roomsService.getAll().subscribe((response: Response<Room[]>) => {
            this.rooms = response?.data?.rooms || [];
            this.isLoading = false;
        });
    }

    createRoom() {
        this.router.navigate(['/rooms/create']).then(() => {});
    }

    deleteRoom(id: number) {
        this.roomsService.delete(id).subscribe(() => {
            this.rooms = this.rooms.filter(room => room.id !== id);
        });
    }

    trackByFn(index: number, item: any): any
    {
        debugger
        return item.id || index;
    }
}
