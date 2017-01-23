import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { IEmployee } from './employee';
import { EmployeeService } from './employee.service';


@Component({
    templateUrl: 'app/employees/employee-form.component.html'
})

export class EmployeeFormComponent implements OnInit{
    pageTitle: string = "Employee Form";
    employee: IEmployee;

    employeeName: string = '';
    employeeEmail: string = '';
    employeeSalary: number;
    leaveCount: number = 0;
    joiningDate: string = '';
    isActive: boolean;
    employeeId: string;
    errorMessage: string = '';
    // showForm: boolean = true;
    // showDeleteConfirmation = false;
    pageAction: string = 'add';

    constructor (private _route: ActivatedRoute,
                 private _router:Router,
                 private _employeeService: EmployeeService) {

    }

    ngOnInit(): void{
        let id = this._route.snapshot.params['id'];
        // console.log("id>>", id);
        if(this._router.url.indexOf("/employees/edit") != -1 ) {
            //Edit case
            this.onEdit(id);
        } else if(this._router.url.indexOf("/employees/add") != -1 ) {
            //Add case
            this.pageTitle = `Add Employee`;
        } else {
            //Delete
            this.onDelete(id);
        }
        console.log("pageAction>>", this.pageAction);
    }

    onBack(): void{
        this._router.navigate(['/employees']);
    }

    onAddSubmit(): void{
        // console.log("Entered name::", this.employeeName);
        console.log("this.isActive::", this.isActive);
        var employeeObject = {
            name: this.employeeName,
            email: this.employeeEmail,
            salary: this.employeeSalary,
            leave_count: this.leaveCount,
            active: (this.isActive ? true : false),
            joining_date: this.joiningDate
        }
        console.log("employeeObject::", employeeObject);
        this._employeeService.addEmployee(employeeObject).subscribe(response => console.log("Sub Response>>", response), 
        error => this.errorMessage = <any>error);
        this._router.navigate(['/employees']);
    }

    onEdit(id: string): void{
        this.employeeId = id;
        this.pageTitle = `Edit Employee ${id}`;
        // this.showForm = true;
        // this.showDeleteConfirmation = false;
        this.pageAction = 'edit';
        console.log("id>>", id);
        this._employeeService.getEmployeeById(id).
            subscribe(response => { 
                //this.employee = response[0]; 
                //console.log("Got employee by id>>", this.employee);
                this.mapEmployeeAttributes(response);
            }, 
        error => this.errorMessage = <any>error);
    }

    onEditSubmit(): void{
        console.log("this.isActive::", this.isActive);
        var employeeObject = {
            name: this.employeeName,
            email: this.employeeEmail,
            salary: this.employeeSalary,
            leave_count: this.leaveCount,
           active: (this.isActive ? true : false),
           joining_date: this.joiningDate,
            _id:this.employeeId
        }
        this._employeeService.editEmployee(employeeObject).subscribe(response => console.log("Sub Response>>", response), 
        error => this.errorMessage = <any>error);
        this._router.navigate(['/employees']);
    }

    mapEmployeeAttributes(employee: any): void{
        console.log("employee.active>>", employee.active);
        this.employeeName = employee.name;
        this.employeeEmail = employee.email;
        this.employeeSalary = employee.salary;
        this.joiningDate =  new DatePipe("en-US").transform(employee.joining_date, 'yyyy-MM-dd');
        this.isActive = employee.active;
        this.leaveCount = employee.leave_count;
    }

    onDelete(id: string): void{
        this.employeeId = id;
        this.pageTitle = `Delete Employee ${id}`;
        // this.showForm = false;
        // this.showDeleteConfirmation = true;
        this.pageAction = 'delete';
        console.log("id>>", id);
        this._employeeService.getEmployeeById(id).
            subscribe(response => { 
                //this.employee = response[0]; 
                //console.log("Got employee by id>>", this.employee);
                //this.mapEmployeeAttributes(response[0]);
            }, 
        error => this.errorMessage = <any>error);
    }

    onDeleteSubmit(): void{
        // console.log("Entered name::", this.employeeName);
        var employeeObject = {
           _id:this.employeeId
        }
        this._employeeService.deleteEmployee(employeeObject).subscribe(response => console.log("Sub Response>>", response), 
        error => this.errorMessage = <any>error);
        this._router.navigate(['/employees']);
    }
}