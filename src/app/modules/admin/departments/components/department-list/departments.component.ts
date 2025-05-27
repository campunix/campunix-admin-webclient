import {ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Department} from "../../../../../models/department";
import {DepartmentsService} from "../../services/departments.service";
import {PaginatedResponse, Response} from "../../../../../models/response";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Pagination} from "../../../../../models/pagination";
import {Organization} from "../../../../../models/organization";
import {OrganizationService} from "../../../organization/services/organization.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-departments',
    templateUrl: './departments.component.html',
    styleUrl: './departments.component.scss',
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
export class DepartmentsComponent implements OnInit {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    searchInputControl = new FormControl('');
    departments: Department[] = [];

    isLoading: boolean = false;
    pagination: Pagination = {
        currentPage: 0,
        totalPages: 0,
        pageSize: 5,
        totalItems: 0
    };

    constructor(
        private departmentService: DepartmentsService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.loadDepartments();
        this.searchInputControl.valueChanges.subscribe((searchQuery) => {
            this.pagination.currentPage = 0;
            this.loadDepartments(searchQuery);
        });
    }

    onPageChange(event: PageEvent) {
        this.pagination.currentPage = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.loadDepartments(this.searchInputControl.value);
    }

    loadDepartments(searchQuery: string = '') {
        this.isLoading = true;
        const page = this.pagination.currentPage + 1;
        const pageSize = this.pagination.pageSize;

        this.departmentService
            .getAllPaginated(page, pageSize, searchQuery)
            .subscribe({
                next: (response) => {
                    if (response?.status && response?.data) {
                        this.departments = response.data.items ?? [];

                        this.pagination = {
                            currentPage: response.data.current_page - 1,
                            totalPages: response.data.total_pages,
                            pageSize: response.data.page_size,
                            totalItems: response.data.total_items
                        };
                    } else {
                        this.departments = [];
                    }
                    this.isLoading = false;
                },
                error: () => this.isLoading = false
            });
    }

    createDepartment() {
        this.router.navigate(['/departments/create']).then(() => {
        });
    }

    editDepartment(id: number) {
        this.router.navigate(['/departments/edit', id]).then(() => {
        });
    }

    deleteDepartment(id: number) {
        this.departmentService.delete(id).subscribe({
            next: () => {
                this.departments = this.departments.filter(it => it.id !== id);
                if (this.departments.length === 0 && this.pagination.currentPage > 0) {
                    this.pagination.currentPage--;
                    this.loadDepartments();
                }

                this._snackBar.open('Department deleted', 'Close', {
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
        return item.departmentID || index;
    }
}
