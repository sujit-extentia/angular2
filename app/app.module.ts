import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';

import {EmployeeListComponent} from './employees/employee-list.component';
import {EmployeeFormComponent} from './employees/employee-form.component';
import {EmployeeFilterPipe} from './employees/employee-filter.pipe';


@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    HttpModule, 
    RouterModule.forRoot([
      { path:'employees', component: EmployeeListComponent },
      { path:'employees/add', component: EmployeeFormComponent },
      { path:'employees/edit/:id', component: EmployeeFormComponent },
      { path:'employees/delete/:id', component: EmployeeFormComponent },
      { path:'', redirectTo:'', pathMatch:'full' },
      { path:'**', redirectTo:'employees'},
    ]) ],
  declarations: [ AppComponent, EmployeeListComponent, EmployeeFormComponent, EmployeeFilterPipe ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
