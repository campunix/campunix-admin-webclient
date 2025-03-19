import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeachersService} from '../../services/teachers.service';
import {Teacher} from 'app/models/teacher';
import {Course} from "../../../../../models/course";
import {Pagination} from "../../../../../models/pagination";
import {CourseService} from "../../../courses/services/course.service";

@Component({
    selector: 'app-teacher-detail',
    templateUrl: './teacher-detail.component.html',
    styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent {
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
        private _teachersService: TeachersService,
        private courseService: CourseService,
    ) {
    }

    ngOnInit(): void {
        this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
        this.getTeacherDetails();
    }

    getTeacherDetails() {
        this._teachersService.get(this.teacherId).subscribe({
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

    loadTeacherCourses(searchQuery: string = '') {
        this.isLoading = true;
        const page = this.pagination.currentPage + 1;
        const pageSize = this.pagination.pageSize;

        this.courseService
            .getAllPaginated(page, pageSize, searchQuery)
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
}
