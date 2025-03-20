import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeachersService} from '../../services/teachers.service';
import {Teacher} from 'app/models/teacher';
import {Course} from "../../../../../models/course";
import {Pagination} from "../../../../../models/pagination";
import {CourseService} from "../../../courses/services/course.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";
import {PreferenceService} from "../../../preferences/services/preference.service";
import {Preference} from "../../../../../models/preference";

@Component({
    selector: 'app-teacher-detail',
    templateUrl: './teacher-detail.component.html',
    styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    courseListSearchInputControl = new FormControl('');
    preferenceListSearchInputControl = new FormControl('');

    alert: any;
    teacherId: number | null = null;
    teacher: Teacher = {id: 0, full_name: '', designation: '', email: '', status: ''};

    courses: Course[] = [];
    preferences: Preference[] = [];

    isCourseListLoading: boolean = false;
    isPreferenceListLoading: boolean = false;

    courseListPagination: Pagination = {
        currentPage: 0,
        totalPages: 0,
        pageSize: 5,
        totalItems: 0
    };

    preferenceListPagination: Pagination = {
        currentPage: 0,
        totalPages: 0,
        pageSize: 5,
        totalItems: 0
    };

    constructor(
        private route: ActivatedRoute,
        private teachersService: TeachersService,
        private courseService: CourseService,
        private preferenceService: PreferenceService,
    ) {
    }

    ngOnInit(): void {
        this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
        this.getTeacherDetails();
        this.getTeacherCourses();
        this.getTeacherPreferences();

        this.courseListSearchInputControl.valueChanges.subscribe((searchQuery) => {
            this.courseListPagination.currentPage = 0;
            this.getTeacherCourses(searchQuery);
        });

        this.preferenceListSearchInputControl.valueChanges.subscribe((searchQuery) => {
            this.preferenceListPagination.currentPage = 0;
            this.getTeacherPreferences(searchQuery);
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
        this.isCourseListLoading = true;
        const page = this.courseListPagination.currentPage + 1;
        const pageSize = this.courseListPagination.pageSize;

        this.courseService
            .getAllByTeacherIdPaginated(this.teacherId, page, pageSize, searchQuery)
            .subscribe({
                next: (response) => {
                    if (response?.status && response?.data) {
                        this.courses = response.data.items ?? [];

                        this.courseListPagination = {
                            currentPage: response.data.current_page - 1,
                            totalPages: response.data.total_pages,
                            pageSize: response.data.page_size,
                            totalItems: response.data.total_items
                        };
                    } else {
                        this.courses = [];
                    }
                    this.isCourseListLoading = false;
                },
                error: () => this.isCourseListLoading = false
            });
    }

    getTeacherPreferences(searchQuery: string = '') {
        this.isPreferenceListLoading = true;
        const page = this.preferenceListPagination.currentPage + 1;
        const pageSize = this.preferenceListPagination.pageSize;

        this.preferenceService
            .getAllByTeacherIdPaginated(this.teacherId, page, pageSize, searchQuery)
            .subscribe({
                next: (response) => {
                    if (response?.status && response?.data) {
                        this.preferences = response.data.items ?? [];

                        this.preferenceListPagination = {
                            currentPage: response.data.current_page - 1,
                            totalPages: response.data.total_pages,
                            pageSize: response.data.page_size,
                            totalItems: response.data.total_items
                        };
                    } else {
                        this.preferences = [];
                    }
                    this.isPreferenceListLoading = false;
                },
                error: () => this.isPreferenceListLoading = false
            });
    }

    onCourseListPageChange(event: PageEvent) {
        this.courseListPagination.currentPage = event.pageIndex;
        this.courseListPagination.pageSize = event.pageSize;
        this.getTeacherCourses(this.courseListSearchInputControl.value);
    }

    onPreferenceListPageChange(event: PageEvent) {
        this.preferenceListPagination.currentPage = event.pageIndex;
        this.preferenceListPagination.pageSize = event.pageSize;
        this.getTeacherCourses(this.preferenceListSearchInputControl.value);
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
