import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Department} from "../../../../../models/department";
import {DepartmentsService} from "../../services/departments.service";
import {Router} from "@angular/router";
import {Response} from "../../../../../models/response";
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Organization} from "../../../../../models/organization";
import {OrganizationService} from "../../../organization/services/organization.service";

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
        private departmentsService: DepartmentsService, private router: Router
    ) {
    }

    ngOnInit(): void {
        this.departmentForm = this._formBuilder.group({
            departmentName: ['', Validators.required],
            departmentCode: ['', [Validators.required]],
        });

        // Fetch the org list
        this.orgService.getAll().subscribe((response: Response<Organization[]>) => {
            this.organizations = response?.data?.items || [];
        });
    }

    createDepartment(): void {
        this.departmentsService.create(this.departmentForm.value).subscribe((response: Response<Department>) => {
            this.router.navigate(['/departments/list']).then(() => {
                this.departmentNgForm.resetForm();
            });
        });
    }

    clearForm(): void {
        this.departmentNgForm.resetForm();
    }
}
