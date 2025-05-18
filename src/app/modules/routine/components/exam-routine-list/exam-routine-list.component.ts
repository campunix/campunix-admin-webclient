import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import { fuseAnimations } from '@fuse/animations';
import { Pagination } from 'app/models/pagination';
import { ClassRoutine } from 'app/models/classRoutine';
import { RoutineService } from '../../services/routine.service';
import { ExamRoutine } from 'app/models/examRoutine';

@Component({
    selector: 'app-exam-routine-list',
    templateUrl: './exam-routine-list.component.html',
    styleUrl: './exam-routine-list.component.scss',
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
export class ExamRoutineListComponent implements OnInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    searchInputControl = new FormControl('');
    routines: ExamRoutine[] = [];
    isLoading: boolean = false;
    pagination: Pagination = {
        currentPage: 0,
        totalPages: 0,
        pageSize: 5,
        totalItems: 0
    };

    constructor(
        private _routineService: RoutineService,
        private router: Router,
        private _snackBar: MatSnackBar) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.loadRoutines();

        this.searchInputControl.valueChanges.subscribe((searchQuery) => {
            this.pagination.currentPage = 0;
            this.loadRoutines(searchQuery);
        });
    }

    onPageChange(event: PageEvent) {
        this.pagination.currentPage = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.loadRoutines(this.searchInputControl.value);
    }

    loadRoutines(searchQuery: string = '') {
        this.isLoading = true;
        const page = this.pagination.currentPage + 1;
        const pageSize = this.pagination.pageSize;

        this._routineService
            .getPaginatedExamRoutines(page, pageSize, searchQuery)
            .subscribe({
                next: (response) => {
                    if (response?.status && response?.data) {
                        this.routines = response.data.items ?? [];

                        this.pagination = {
                            currentPage: response.data.current_page - 1,
                            totalPages: response.data.total_pages,
                            pageSize: response.data.page_size,
                            totalItems: response.data.total_items
                        };
                    } else {
                        this.routines = [];
                    }
                    this.isLoading = false;
                },
                error: () => this.isLoading = false
            });
    }

    createRoutine() {
        this.router.navigate(['/routine/exam/create']).then(() => {
        });
    }

    deleteRoutine(id: number) {
        this._routineService.deleteClassRoutine(id).subscribe({
            next: () => {
                this.routines = this.routines.filter(it => it.id !== id);
                if (this.routines.length === 0 && this.pagination.currentPage > 0) {
                    this.pagination.currentPage--;
                    this.loadRoutines();
                }

                this._snackBar.open('Routine deleted', 'Close', {
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
