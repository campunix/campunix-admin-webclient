import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {Router, ActivatedRoute} from '@angular/router';
import {TeachersService} from '../../services/teachers.service';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {Pagination} from '../../../../../models/pagination';
import {Teacher} from 'app/models/teacher';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-teachers',
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.scss'],
    animations: fuseAnimations,
})
export class TeachersComponent implements OnInit {
    searchInputControl = new FormControl('');
    teachers: Teacher[] = [];

    isLoading: boolean = false;
    pagination: Pagination = {
        currentPage: 0,
        totalPages: 0,
        pageSize: 5,
        totalItems: 0
    };

    constructor(
        private teachersService: TeachersService,
        private router: Router,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar
    ) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.loadTeachers();

        this.searchInputControl.valueChanges.subscribe((searchQuery) => {
            this.pagination.currentPage = 0;
            this.loadTeachers(searchQuery);
        });
    }

    onPageChange(event: PageEvent) {
        this.pagination.currentPage = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.loadTeachers(this.searchInputControl.value);
    }

    loadTeachers(searchQuery: string = '') {
        this.isLoading = true;
        const page = this.pagination.currentPage + 1;
        const pageSize = this.pagination.pageSize;

        this.teachersService
            .getAllPaginated(page, pageSize, searchQuery)
            .subscribe({
                next: (response) => {
                    if (response?.status && response?.data) {
                        this.teachers = response.data.items ?? [];

                        this.pagination = {
                            currentPage: response.data.current_page - 1,
                            totalPages: response.data.total_pages,
                            pageSize: response.data.page_size,
                            totalItems: response.data.total_items
                        };
                    } else {
                        this.teachers = [];
                    }
                    this.isLoading = false;
                },
                error: () => this.isLoading = false
            });
    }

    createTeacher() {
        this.router.navigate(['/teachers/create']).then(() => {
        });
    }

    editTeacher(id: number) {
        this.router.navigate(['/teachers/edit', id], { relativeTo: this.route }).then(() => {});
    }

    deleteTeacher(id: number) {
        this.teachersService.delete(id).subscribe({
            next: () => {
                this.teachers = this.teachers.filter(it => it.id !== id);
                if (this.teachers.length === 0 && this.pagination.currentPage > 0) {
                    this.pagination.currentPage--;
                    this.loadTeachers();
                }

                this._snackBar.open('Teacher deleted', 'Close', {
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

    navigateToTeacherDetails(teacherId: number) {
        this.router.navigate(['/teachers/detail', teacherId]).then(() => {});
    }

    trackByFn(index: number, item: any): any {
        return item.teacherID || index;
    }
}
