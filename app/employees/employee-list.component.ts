import { Component } from '@angular/core';
import {IEmployee} from './employee';
import { EmployeeService } from './employee.service';

@Component({
    selector:"pm-employees",
    moduleId:module.id,
    templateUrl:"employee-list.component.html",
    styleUrls: ["employee-list.component.css"]
})

export class EmployeeListComponent {
    pageTitle: string = "Employee List";
    isActive: boolean = false;
    listFilter:string;
    errorMessage: string;

    employees: IEmployee[];

    constructor(private _employeeService: EmployeeService) {

    }

    toggleImage(): void {
        this.isActive = !this.isActive;
    }

    ngOnInit(): void {
        this._employeeService.getAllEmployees().subscribe(employees => this.employees = employees, 
        error => this.errorMessage = <any>error);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Employee list: ' + message;
    }

}