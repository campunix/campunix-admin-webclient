import {ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Department} from "../../../../../models/department";
import {DepartmentsService} from "../../services/departments.service";
import {Response} from "../../../../../models/response";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Pagination} from "../../../../../models/pagination";
import {Organization} from "../../../../../models/organization";
import {OrganizationService} from "../../../organization/services/organization.service";

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
        length: 10,
        size: 10,
        page: 0,
        lastPage: 10,
        startIndex: 0,
        endIndex: 9,
    };

    constructor(
        private departmentService: DepartmentsService,
        private router: Router
    ) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.departmentService.getAll().subscribe((response: Response<Department[]>) => {
            this.departments = response?.data?.items || [];
            this.isLoading = false;
        });
    }

    createDepartment() {
        this.router.navigate(['/departments/create']).then(() => {});
    }

    deleteDepartment(id: number) {
        this.departmentService.delete(id).subscribe(() => {
            this.departments = this.departments.filter(department => department.id !== id);
        });
    }

    trackByFn(index: number, item: any): any
    {
        return item.departmentID || index;
    }
}
