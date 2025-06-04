import { Component, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
    @ViewChild('changePasswordNgForm') changePasswordNgForm: NgForm;

    changePasswordForm: UntypedFormGroup;
    isSubmitting = false;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {
        this.changePasswordForm = this._formBuilder.group({
            currentPassword: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator(form: UntypedFormGroup): null | object {
        const password = form.get('password')?.value;
        const confirm = form.get('passwordConfirm')?.value;
        return password === confirm ? null : { mustMatch: true };
    }

    changePassword(): void {
        if (this.changePasswordForm.invalid) {
            return;
        }

        this.isSubmitting = true;
        this.changePasswordForm.disable();

        const payload = {
            current_password: this.changePasswordForm.get('currentPassword')?.value,
            new_password: this.changePasswordForm.get('password')?.value,
            confirm_password: this.changePasswordForm.get('passwordConfirm')?.value
        };

        this._authService.changePassword(payload).subscribe({
            next: () => {
                this._snackBar.open('Password changed successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });
                this.changePasswordNgForm.resetForm();
                this.changePasswordForm.enable();
                this.isSubmitting = false;
            },
            error: (error) => {
                this._snackBar.open('Failed to change password: ' + error.message, 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });
                this.isSubmitting = false;
                this.changePasswordForm.enable();
            },
            complete: () => {
                this.isSubmitting = false;
                this.changePasswordForm.enable();
            }
        });
    }

    clearForm(): void {
        this.changePasswordNgForm.resetForm();
    }
}
