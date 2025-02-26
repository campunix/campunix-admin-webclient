import {Component, OnInit, ViewChild} from '@angular/core';
import {PaginatedResponse, Response} from "../../../../../models/response";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Pagination} from "../../../../../models/pagination";
import {Course} from "../../../../../models/course";
import {CourseService} from "../../services/course.service";

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrl: './course.component.scss',
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
export class CourseComponent implements OnInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    searchInputControl = new FormControl('');
    courses: Course[] = [];
    isLoading: boolean = false;
    pagination: Pagination = {
        currentPage: 0,
        totalPages: 0,
        pageSize: 5,
        totalItems: 0
    };

    constructor(private courseService: CourseService, private router: Router) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.loadCourses();
    }

    onPageChange(event: PageEvent) {
        this.pagination.currentPage = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.loadCourses();
    }

    loadCourses() {
        this.isLoading = true;
        const page = this.pagination.currentPage + 1;
        const pageSize = this.pagination.pageSize;

        this.courseService
            .getAllPaginated(page, pageSize)
            .subscribe({
                next: (response) => {
                    if (response?.status && response?.data) {
                        this.courses = response.data.items ?? [];

                        this.pagination = {
                            currentPage: response.data.current_page - 1,
                            totalPages: response.data.total_pages,
                            pageSize: response.data.page_size,
                            totalItems: response.data.total_items
                        };
                    } else {
                        this.courses = [];
                    }
                    this.isLoading = false;
                },
                error: () => this.isLoading = false
            });
    }

    createCourse() {
        this.router.navigate(['/courses/create']).then(() => {});
    }

    deleteCourse(id: number) {
        this.courseService.delete(id).subscribe(() => {
            this.courses = this.courses.filter(course => course.id !== id);
        });
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
