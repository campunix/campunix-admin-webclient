import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeachersService} from '../../services/teachers.service';
import {Teacher} from 'app/models/teacher';
import {Course} from "../../../../../models/course";
import {Pagination} from "../../../../../models/pagination";
import {CourseService} from "../../../courses/services/course.service";
import {DepartmentsService} from "../../../departments/services/departments.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-teacher-detail',
    templateUrl: './teacher-detail.component.html',
    styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    searchInputControl = new FormControl('');
    alert: any;
    teacherId: number | null = null;
    teacher: Teacher = {id: 0, full_name: '', designation: '', email: '', status: ''};
    courses: Course[] = [];

    isLoading: boolean = false;
    pagination: Pagination = {
        currentPage: 0,
        totalPages: 0,
        pageSize: 5,
        totalItems: 0
    };

    constructor(
        private route: ActivatedRoute,
        private teachersService: TeachersService,
        private courseService: CourseService
    ) {
    }

    ngOnInit(): void {
        this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
        this.getTeacherDetails();
        this.getTeacherCourses();

        this.searchInputControl.valueChanges.subscribe((searchQuery) => {
            this.pagination.currentPage = 0;
            this.getTeacherCourses(searchQuery);
        });
    }

    getTeacherDetails() {
        this.teachersService.get(this.teacherId).subscribe({
            next: (response) => {
                console.log('Data response:', response.data);
                if (response?.data) {
                    this.teacher = response.data
                } else {
                    this.teacher = null;
                }
            },
            error: (err) => {
                console.error('Error fetching teacher details:', err);
                this.teacher = null;
            }
        });
    }

    getTeacherCourses(searchQuery: string = '') {
        this.isLoading = true;
        const page = this.pagination.currentPage + 1;
        const pageSize = this.pagination.pageSize;

        this.courseService
            .getAllByTeacherIdPaginated(this.teacherId, page, pageSize, searchQuery)
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

    onPageChange(event: PageEvent) {
        this.pagination.currentPage = event.pageIndex;
        this.pagination.pageSize = event.pageSize;
        this.getTeacherCourses(this.searchInputControl.value);
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
