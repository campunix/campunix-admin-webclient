import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Department} from "../../../../../models/department";
import {Router} from "@angular/router";
import {Response} from "../../../../../models/response";
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {OrganizationService} from "../../services/organization.service";
import {Organization} from "../../../../../models/organization";

@Component({
    selector: 'app-organization-create',
    templateUrl: './organization-create.component.html',
    styleUrl: './organization-create.component.scss'
})
export class OrganizationCreateComponent {
    department: Organization = {id: 0, name: ''};
    @ViewChild('organizationNgForm') organizationNgForm: NgForm;

    alert: any;
    organizationForm: UntypedFormGroup;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private organizationService: OrganizationService, private router: Router
    ) {
    }

    ngOnInit(): void {
        this.organizationForm = this._formBuilder.group({
            name: ['', Validators.required],
        });
    }

    createOrganization(): void {
        this.organizationService.create(this.organizationForm.value).subscribe((response: Response<Organization>) => {
            this.router.navigate(['/organizations/list']).then(() => {
                this.organizationNgForm.resetForm();
            });
        });
    }

    clearForm(): void {
        this.organizationNgForm.resetForm();
    }
}
