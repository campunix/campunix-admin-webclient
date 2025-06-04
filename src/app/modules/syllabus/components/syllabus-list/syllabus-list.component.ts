import {Component, OnInit, ViewChild} from '@angular/core';
import {SyllabusService} from "../../services/syllabus.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import { fuseAnimations } from '@fuse/animations';
import { Pagination } from 'app/models/pagination';
import { SyllabusData } from 'app/models/syllabus_data';

@Component({
    selector: 'app-syllabus-list',
    templateUrl: './syllabus-list.component.html',
    styleUrl: './syllabus-list.component.scss',
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
export class SyllabusListComponent implements OnInit {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    searchInputControl = new FormControl('');
    syllabuses: SyllabusData[] = [];

    isLoading: boolean = false;
    pagination: Pagination = {
        currentPage: 0,
        totalPages: 0,
        pageSize: 5,
        totalItems: 0
    };

    constructor(
        private syllabusService: SyllabusService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.loadSyllabuses();
        this.searchInputControl.valueChanges.subscribe((searchQuery) => {
            this.pagination.currentPage = 0;
            this.loadSyllabuses(searchQuery);
        });
    }

    onPageChange(event: PageEvent) {
        this.pagination.currentPage = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.loadSyllabuses(this.searchInputControl.value);
    }

    loadSyllabuses(searchQuery: string = '') {
        this.isLoading = true;
        const page = this.pagination.currentPage + 1;
        const pageSize = this.pagination.pageSize;

        this.syllabusService
            .getAllPaginated(page, pageSize, searchQuery)
            .subscribe({
                next: (response) => {
                    if (response?.status && response?.data) {
                        this.syllabuses = response.data.items ?? [];

                        this.pagination = {
                            currentPage: response.data.current_page - 1,
                            totalPages: response.data.total_pages,
                            pageSize: response.data.page_size,
                            totalItems: response.data.total_items
                        };
                    } else {
                        this.syllabuses = [];
                    }
                    this.isLoading = false;
                },
                error: () => this.isLoading = false
            });
    }

    redirectToCreateForm() {
        this.router.navigate(['/syllabus/create']).then(() => {});
    }

    redirectToUploadSyllabus() {
        this.router.navigate(['/syllabus/upload']).then(() => {});
    }

    viewSyllabus(id: number) {
        this.router.navigate([`/syllabus/${id}/view`]).then(() => {});
    }

    deleteSyllabus(id: number) {
        this.syllabusService.delete(id).subscribe({
            next: () => {
                this.syllabuses = this.syllabuses.filter(it => it.id !== id);
                if (this.syllabuses.length === 0 && this.pagination.currentPage > 0) {
                    this.pagination.currentPage--;
                    this.loadSyllabuses();
                }

                this._snackBar.open('Syllabus deleted', 'Close', {
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
        return item.syllabusID || index;
    }
}
