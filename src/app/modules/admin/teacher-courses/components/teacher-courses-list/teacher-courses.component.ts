import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {Pagination} from '../../../../../models/pagination';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TeacherCoursesService} from "../../services/teacher-courses.service";
import {TeacherCourses} from "../../../../../models/teacher-courses";

@Component({
    selector: 'app-teacher-courses',
    templateUrl: './teacher-courses.component.html',
    styleUrls: ['./teacher-courses.component.scss'],
    animations: fuseAnimations,
})
export class TeacherCoursesComponent implements OnInit {
    searchInputControl = new FormControl('');
    teacherCourses: TeacherCourses[] = [];

    isLoading: boolean = false;
    pagination: Pagination = {
        currentPage: 0,
        totalPages: 0,
        pageSize: 5,
        totalItems: 0
    };

    constructor(
        private teacherCoursesService: TeacherCoursesService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.loadTeacherCourses();

        this.searchInputControl.valueChanges.subscribe((searchQuery) => {
            this.pagination.currentPage = 0;
            this.loadTeacherCourses(searchQuery);
        });
    }

    onPageChange(event: PageEvent) {
        this.pagination.currentPage = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.loadTeacherCourses(this.searchInputControl.value);
    }

    loadTeacherCourses(searchQuery: string = '') {
        this.isLoading = true;
        const page = this.pagination.currentPage + 1;
        const pageSize = this.pagination.pageSize;

        this.teacherCoursesService
            .getAllPaginated(page, pageSize, searchQuery)
            .subscribe({
                next: (response) => {
                    if (response?.status && response?.data) {
                        this.teacherCourses = response.data.items ?? [];

                        this.pagination = {
                            currentPage: response.data.current_page - 1,
                            totalPages: response.data.total_pages,
                            pageSize: response.data.page_size,
                            totalItems: response.data.total_items
                        };
                    } else {
                        this.teacherCourses = [];
                    }
                    this.isLoading = false;
                },
                error: () => this.isLoading = false
            });
    }

    createTeacherCourses() {
        this.router.navigate(['/teacherCourses/create']).then(() => {
        });
    }

    deleteTeacherCourses(id: number) {
        this.teacherCoursesService.delete(id).subscribe({
            next: () => {
                this.teacherCourses = this.teacherCourses.filter(it => it.id !== id);
                if (this.teacherCourses.length === 0 && this.pagination.currentPage > 0) {
                    this.pagination.currentPage--;
                    this.loadTeacherCourses();
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

    trackByFn(index: number, item: any): any {
        return item.teacherID || index;
    }
}
