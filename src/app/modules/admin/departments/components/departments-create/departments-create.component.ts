import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Department} from "../../../../../models/department";
import {DepartmentsService} from "../../services/departments.service";
import {Router} from "@angular/router";
import {Response} from "../../../../../models/response";
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-departments-create',
    templateUrl: './departments-create.component.html',
    styleUrl: './departments-create.component.scss'
})
export class DepartmentsCreateComponent {
    department: Department = {departmentID: 0,departmentName: '', departmentCode: ''};
    @ViewChild('departmentNgForm') departmentNgForm: NgForm;

    alert: any;
    departmentForm: UntypedFormGroup;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private departmentsService: DepartmentsService, private router: Router
    )
    {}

    ngOnInit(): void
    {
        this.departmentForm = this._formBuilder.group({
            departmentName   : ['', Validators.required],
            departmentCode  : ['', [Validators.required]],
        });
    }

    createDepartment(): void {
        debugger;
        this.departmentsService.create(this.departmentForm.value).subscribe((response: Response<Department>) => {
            this.router.navigate(['/departments/list']).then(() => {
                this.departmentNgForm.resetForm();
            });
        });
    }

    clearForm(): void
    {
        this.departmentNgForm.resetForm();
    }
}
