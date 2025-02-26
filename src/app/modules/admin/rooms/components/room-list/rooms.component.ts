import {Component, OnInit, ViewChild} from '@angular/core';
import {PaginatedResponse, Response} from "../../../../../models/response";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
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
        currentPage: 0,
        totalPages: 0,
        pageSize: 5,
        totalItems: 0
    };

    constructor(private roomsService: RoomsService, private router: Router) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.loadRooms();
    }

    onPageChange(event: PageEvent) {
        this.pagination.currentPage = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.loadRooms();
    }

    loadRooms() {
        this.isLoading = true;
        const page = this.pagination.currentPage + 1;
        const pageSize = this.pagination.pageSize;

        this.roomsService
            .getAllPaginated(page, pageSize)
            .subscribe({
                next: (response) => {
                    if (response?.status && response?.data) {
                        this.rooms = response.data.items ?? [];

                        this.pagination = {
                            currentPage: response.data.current_page - 1,
                            totalPages: response.data.total_pages,
                            pageSize: response.data.page_size,
                            totalItems: response.data.total_items
                        };
                    } else {
                        this.rooms = [];
                    }
                    this.isLoading = false;
                },
                error: () => this.isLoading = false
            });
    }

    createRoom() {
        this.router.navigate(['/rooms/create']).then(() => {
        });
    }

    deleteRoom(id: number) {
        this.roomsService.delete(id).subscribe(() => {
            this.rooms = this.rooms.filter(room => room.id !== id);
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
