import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListResponse, Response} from "../../../../../models/response";
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {PreferenceService} from "../../services/preference.service";
import {DepartmentsService} from "../../../departments/services/departments.service";
import {Department} from "../../../../../models/department";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Teacher} from "../../../../../models/teacher";
import {TeachersService} from "../../../teachers/services/teachers.service";
import {Preference} from "../../../../../models/preference";

@Component({
    selector: 'app-preference-create',
    templateUrl: './preference-create.component.html',
    styleUrl: './preference-create.component.scss'
})
export class PreferenceCreateComponent implements OnInit {
    departments: Array<Department> = [];
    teachers: Array<Teacher> = [];
    days: Array<string> = [];
    slots: Array<number> = [1, 2, 3, 4, 5, 6];
    @ViewChild('preferenceNgForm') preferenceNgForm: NgForm;

    alert: any;
    preferenceForm: UntypedFormGroup;

    isEditMode: boolean = false;
    preferenceId: number | null = null;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private departmentsService: DepartmentsService,
        private teachersService: TeachersService,
        private preferenceService: PreferenceService,
        private router: Router,
        private _snackBar: MatSnackBar,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.preferenceForm = this._formBuilder.group({
            department_id: ['', Validators.required],
            teacher_id: ['', Validators.required],
            day: [[], Validators.required],
            slot_no: [[], Validators.required]
        });

        this.departmentsService.getAll().subscribe((response: Response<ListResponse<Department>>) => {
            this.departments = response.data.items ?? [];
        });

        this.preferenceService.getDays().subscribe((response: Response<ListResponse<string>>) => {
            this.days = response.data.items ?? [];
        });

        // Check edit mode based on route
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.isEditMode = true;
                this.preferenceId = +id;
                this.loadPreference(+id);
            }
        });
    }

    loadPreference(id: number): void {
        this.preferenceService.get(id).subscribe({
            next: (response: Response<Preference>) => {
                const preference = response.data;
                this.preferenceForm.patchValue({
                    department_id: preference.department_id ?? '',
                    day: preference.day ?? '',
                    slot_no: preference.slot_no ?? ''
                });
                // Load teachers and patch teacher_id after teachers are loaded
                this.getAllTeachers(preference.department_id, preference.teacher_id);
            },
            error: (error) => {
                this._snackBar.open('Failed to load preference: ' + error.message, 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });
            }
        });
    }

    getAllTeachers(department_id: number, teacher_id?: number) {
        this.teachersService.getAll(department_id).subscribe((response: Response<ListResponse<Teacher>>) => {
            this.teachers = response?.data?.items ?? [];
            if (teacher_id) {
                this.preferenceForm.patchValue({ teacher_id });
            }
        });
    }

    createPreference(): void {
        this.preferenceService.create(this.preferenceForm.value).subscribe({
            next: () => {
                this._snackBar.open('Preference created successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });

                this.router.navigate(['/preferences/list']).then(() => {
                    this.preferenceNgForm.resetForm();
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

    updatePreference(): void {
        if (this.preferenceId) {
            this.preferenceService.update(this.preferenceId, this.preferenceForm.value).subscribe({
                next: () => {
                    this._snackBar.open('Preference updated successfully', 'Close', {
                        duration: 3000,
                        horizontalPosition: 'center',
                        verticalPosition: 'bottom'
                    });

                    this.router.navigate(['/preferences/list']).then(() => {
                        this.preferenceNgForm.resetForm();
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
    }

    clearForm(): void {
        this.preferenceNgForm.resetForm();
    }
}
