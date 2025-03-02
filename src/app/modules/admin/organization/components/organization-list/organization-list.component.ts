import {Component, OnInit, ViewChild} from '@angular/core';
import {OrganizationService} from "../../services/organization.service";
import {ListResponse, PaginatedResponse, Response} from "../../../../../models/response";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Pagination} from "../../../../../models/pagination";
import {Organization} from "../../../../../models/organization";

@Component({
    selector: 'app-organization-list',
    templateUrl: './organization-list.component.html',
    styleUrl: './organization-list.component.scss',
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
export class OrganizationListComponent implements OnInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    searchInputControl = new FormControl('');
    organizations: Organization[] = [];
    isLoading: boolean = false;
    pagination: Pagination = {
        currentPage: 0,
        totalPages: 0,
        pageSize: 5,
        totalItems: 0
    };

    constructor(private organizationService: OrganizationService, private router: Router) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.organizationService.getAll().subscribe((response: Response<ListResponse<Organization>>) => {
            this.organizations = response.data.items ?? [];
            this.isLoading = false;
        });
    }

    createOrganization() {
        this.router.navigate(['/organizations/create']).then(() => {
        });
    }

    navigateToDepartments(organizationId: number) {
        this.router.navigate(['/departments']).then(() => {});
    }

    navigateToDepartments(organizationId: number) {
        this.router.navigate(['/departments']).then(() => {});
    }

    deleteOrganization(id: number) {
        this.organizationService.delete(id).subscribe(() => {
            this.organizations = this.organizations.filter(orientation => orientation.id !== id);
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
