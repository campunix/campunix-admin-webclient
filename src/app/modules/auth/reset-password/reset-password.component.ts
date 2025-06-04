import { NgIf } from '@angular/common';
import {
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { AuthService } from 'app/core/auth/auth.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'auth-reset-password',
    templateUrl: './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        NgIf,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        RouterLink
    ],
})
export class AuthResetPasswordComponent implements OnInit {
    @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

    resetPasswordForm: UntypedFormGroup;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert = false;
    private token: string | null = null;

    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        // Get the token from the query parameter
        this.token = this._route.snapshot.queryParamMap.get('token');

        // If no token, show error alert
        if (!this.token) {
            this.alert = {
                type: 'error',
                message: 'Reset token is missing or invalid. Please try the reset process again.',
            };
            this.showAlert = true;
            return;
        }

        // Create form
        this.resetPasswordForm = this._formBuilder.group(
            {
                password: ['', Validators.required],
                passwordConfirm: ['', Validators.required],
            },
            {
                validators: FuseValidators.mustMatch('password', 'passwordConfirm'),
            }
        );
    }

    get password() {
        return this.resetPasswordForm.get('password');
    }

    resetPassword(): void {
        if (this.resetPasswordForm.invalid || !this.token) {
            return;
        }

        this.resetPasswordForm.disable();
        this.showAlert = false;

        this._authService
            .resetPassword({
                token: this.token,
                new_password: this.resetPasswordForm.get('password')?.value,
                confirm_password: this.resetPasswordForm.get('passwordConfirm')?.value
            })
            .pipe(
                finalize(() => {
                    this.resetPasswordForm.enable();
                })
            )
            .subscribe(
                () => {
                    this.alert = {
                        type: 'success',
                        message: 'Your password has been reset successfully.',
                    };
                    this.resetPasswordNgForm.resetForm();
                    this.showAlert = true;
                },
                () => {
                    this.alert = {
                        type: 'error',
                        message: 'Failed to reset password. Please try again or request a new link.',
                    };
                    this.showAlert = true;
                }
            );

    }
}
