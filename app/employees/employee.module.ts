import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EmployeeListComponent } from './employee-list.component';
import { EmployeeFormComponent } from './employee-form.component';
import { EmployeeService } from './employee.service';

@NgModule({
    declarations:[
        EmployeeListComponent,
        EmployeeFormComponent
    ],

    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            { path:'employees', component: EmployeeListComponent },
            { path:'employees/add', component: EmployeeFormComponent },
            { path:'employees/edit/:id', component: EmployeeFormComponent },
            { path:'employees/delete/:id', component: EmployeeFormComponent }
        ])
    ],

    providers: [
        EmployeeService
    ]
})

export class EmployeeModule{}