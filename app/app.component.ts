import { Component } from '@angular/core';
import { EmployeeService } from './employees/employee.service'; 

@Component({
    selector: 'pm-app',
    // template: `
    //     <div>
    //         <h1>{{pageTitle}}</h1>
    //         <pm-employees></pm-employees>
    //     <div>
    // `,
    template: `
        <div class='container'>
            <h1>{{pageTitle}}</h1>
            <router-outlet></router-outlet>
        <div>
    `,
    providers:[EmployeeService]
})
export class AppComponent { 
    pageTitle: String = "Employee Management";
}
