import {Component, OnInit, ViewChild} from '@angular/core';
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Pagination} from "../../../../../models/pagination";
import {Preference} from "../../../../../models/preference";
import {PreferenceService} from "../../services/preference.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-preference',
    templateUrl: './preference.component.html',
    styleUrl: './preference.component.scss',
    styles: [
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
export class PreferenceComponent implements OnInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    searchInputControl = new FormControl('');
    preferences: Preference[] = [];
    isLoading: boolean = false;
    pagination: Pagination = {
        currentPage: 0,
        totalPages: 0,
        pageSize: 5,
        totalItems: 0
    };

    constructor(private preferenceService: PreferenceService, private router: Router, private _snackBar: MatSnackBar) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.loadPreferences();

        this.searchInputControl.valueChanges.subscribe((searchQuery) => {
            this.pagination.currentPage = 0;
            this.loadPreferences(searchQuery);
        });
    }

    onPageChange(event: PageEvent) {
        this.pagination.currentPage = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.loadPreferences(this.searchInputControl.value);
    }

    loadPreferences(searchQuery: string = '') {
        this.isLoading = true;
        const page = this.pagination.currentPage + 1;
        const pageSize = this.pagination.pageSize;

        this.preferenceService
            .getAllPaginated(page, pageSize, searchQuery)
            .subscribe({
                next: (response) => {
                    if (response?.status && response?.data) {
                        this.preferences = response.data.items ?? [];

                        this.pagination = {
                            currentPage: response.data.current_page - 1,
                            totalPages: response.data.total_pages,
                            pageSize: response.data.page_size,
                            totalItems: response.data.total_items
                        };
                    } else {
                        this.preferences = [];
                    }
                    this.isLoading = false;
                },
                error: () => this.isLoading = false
            });
    }

    createPreference() {
        this.router.navigate(['/preferences/create']).then(() => {
        });
    }

    editPreference(id: number) {
        this.router.navigate(['/preferences/edit', id]).then(() => {
        });
    }

    deletePreference(id: number) {
        this.preferenceService.delete(id).subscribe({
            next: () => {
                this.preferences = this.preferences.filter(it => it.id !== id);
                if (this.preferences.length === 0 && this.pagination.currentPage > 0) {
                    this.pagination.currentPage--;
                    this.loadPreferences();
                }

                this._snackBar.open('Preference deleted', 'Close', {
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
