import {Component, ViewChild} from '@angular/core';
import {Department} from "../../../../../models/department";
import {DepartmentsService} from "../../services/departments.service";
import {Router} from "@angular/router";
import {ListResponse, Response} from "../../../../../models/response";
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Organization} from "../../../../../models/organization";
import {OrganizationService} from "../../../organization/services/organization.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-departments-create',
    templateUrl: './departments-create.component.html',
    styleUrl: './departments-create.component.scss'
})
export class DepartmentsCreateComponent {
    department: Department = {id: 0, name: '', code: '', organization_id: 0, created_by: ''};
    organizations: Organization[] = [];
    @ViewChild('departmentNgForm') departmentNgForm: NgForm;

    alert: any;
    departmentForm: UntypedFormGroup;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private orgService: OrganizationService,
        private departmentsService: DepartmentsService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.departmentForm = this._formBuilder.group({
            name: ['', Validators.required],
            code: ['', [Validators.required]],
            organization_id: ['', Validators.required],
        });

        // Fetch the org list
        this.orgService.getAll().subscribe((response: Response<ListResponse<Organization>>) => {
            this.organizations = Array.isArray(response.data.items) ? response.data.items.flat() : [];
        });
    }

    createDepartment(): void {
        this.departmentsService.create(this.departmentForm.value).subscribe({
            next: () => {
                this._snackBar.open('Department created successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });

                this.router.navigate(['/departments/list']).then(() => {
                    this.departmentNgForm.resetForm();
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

    clearForm(): void {
        this.departmentNgForm.resetForm();
    }
}
