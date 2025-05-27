import {Component, OnInit, ViewChild} from '@angular/core';
import {PaginatedResponse, Response} from "../../../../../models/response";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Router, ActivatedRoute} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Pagination} from "../../../../../models/pagination";
import {Room} from "../../../../../models/room";
import {RoomsService} from "../../services/rooms.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

    constructor(
        private roomsService: RoomsService,
        private router: Router,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar
    ) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.loadRooms();

        this.searchInputControl.valueChanges.subscribe((searchQuery) => {
            this.pagination.currentPage = 0;
            this.loadRooms(searchQuery);
        });
    }

    onPageChange(event: PageEvent) {
        this.pagination.currentPage = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.loadRooms(this.searchInputControl.value);
    }

    loadRooms(searchQuery: string = '') {
        this.isLoading = true;
        const page = this.pagination.currentPage + 1;
        const pageSize = this.pagination.pageSize;

        this.roomsService
            .getAllPaginated(page, pageSize, searchQuery)
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
        this.router.navigate(['/rooms/create']).then(() => {});
    }

    editRoom(id: number) {
        this.router.navigate(['/rooms/edit', id], { relativeTo: this.route }).then(() => {});
    }

    deleteRoom(id: number) {
        this.roomsService.delete(id).subscribe({
            next: () => {
                this.rooms = this.rooms.filter(it => it.id !== id);
                if (this.rooms.length === 0 && this.pagination.currentPage > 0) {
                    this.pagination.currentPage--;
                    this.loadRooms();
                }

                this._snackBar.open('Room deleted', 'Close', {
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

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
