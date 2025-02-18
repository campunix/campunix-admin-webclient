import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TeachersService } from '../../services/teachers.service';
import { Response } from '../../../../../models/response';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { Pagination } from '../../../../../models/pagination';
import { Teacher } from 'app/models/teacher';

@Component({
    selector: 'app-teachers',
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.scss'],
    animations: fuseAnimations,
})
export class TeachersComponent implements OnInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    searchInputControl = new FormControl('');
    teachers: Teacher[] = [];

    isLoading: boolean = false;
    pagination: Pagination = {
        length: 10,
        size: 10,
        page: 0,
        lastPage: 10,
        startIndex: 0,
        endIndex: 9,
    };

    constructor(
        private teachersService: TeachersService,
        private router: Router
    ) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.teachersService.getAll().subscribe((response: Response<Teacher[]>) => {
            this.teachers = response?.data?.items || [];
            this.isLoading = false;
        });
    }

    createTeacher() {
        this.router.navigate(['/teachers/create']).then(() => { });
    }

    deleteTeacher(id: number) {
        this.teachersService.delete(id).subscribe(() => {
            this.teachers = this.teachers.filter(teacher => teacher.id !== id);
        });
    }

    trackByFn(index: number, item: any): any {
        return item.teacherID || index;
    }
}
