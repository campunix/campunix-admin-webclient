import {NgModule} from '@angular/core';
import {AsyncPipe, CommonModule, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule, MatRippleModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from "@angular/material/menu";
import {FuseAlertComponent} from "../../../../@fuse/components/alert";
import {OrganizationListComponent} from "./components/organization-list/organization-list.component";
import {OrganizationCreateComponent} from "./components/organization-create/organization-create.component";
import { FuseCardComponent } from '@fuse/components/card';
import { UserComponent } from 'app/layout/common/user/user.component';

@NgModule({
    declarations: [OrganizationListComponent, OrganizationCreateComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgIf,
        MatProgressBarModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSortModule,
        NgFor,
        NgTemplateOutlet,
        MatPaginatorModule,
        NgClass,
        MatSlideToggleModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        MatRippleModule,
        AsyncPipe,
        CurrencyPipe,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: OrganizationListComponent
            },
            {
                path: 'create',
                component: OrganizationCreateComponent
            }
        ]),
        MatMenuModule,
        FuseAlertComponent,
        FuseCardComponent,
        UserComponent
    ]
})
export class OrganizationModule {
}
