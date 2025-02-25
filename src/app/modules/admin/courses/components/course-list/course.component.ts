import {Component, OnInit, ViewChild} from '@angular/core';
import {Response} from "../../../../../models/response";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
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
        this.courseService.getAll().subscribe((response: Response<Course[]>) => {
            this.courses = Array.isArray(response.data.items) ? response.data.items.flat() : [];
            this.isLoading = false;
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
