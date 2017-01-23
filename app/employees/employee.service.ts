import {Injectable} from '@angular/core';
import {IEmployee} from './employee'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmployeeService {

    private apiBase = "http://localhost:9000";
    private _getEmployeeUrl = "/getallemployees";
    private _addEmployeeUrl = "/createemployee";
    private _getEmployeeByIdUrl = "/getemployeebyid";
    private _editEmployeeUrl = "/updateemployee";
    private _deleteEmployeeUrl = "/deleteemployee";

    

    constructor (private _http: Http) {}

    getAllEmployees(): Observable<IEmployee[]> {
        return this._http.get(this.apiBase + this._getEmployeeUrl)
        // .map((response: Response) => <IEmployee[]>response.json())
        .map(this.extractData)
        .do(data => console.log("All: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    addEmployee(employeeObject: any): Observable<IEmployee[]> {
        console.log("employeeObject2>>", employeeObject);
        
        return this._http.post(this.apiBase + this._addEmployeeUrl, employeeObject)
        // .map((response: Response) => <IEmployee[]>response.json())
        .map(this.extractData)
        .do(data => console.log("All: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    getEmployeeById(id: string): Observable<IEmployee[]> {
        console.log("id2>>>", id);
        let requestBody ={
            _id : id
        };
        
        return this._http.post(this.apiBase + this._getEmployeeByIdUrl, requestBody)
        // .map((response: Response) => <IEmployee[]>response.json())
        .map(this.extractData)
        .do(data => console.log("Get Employee Success: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    editEmployee(employeeObject: Object): Observable<IEmployee[]> {
        return this._http.post(this.apiBase + this._editEmployeeUrl, employeeObject)
            // .map((response: Response) => <IEmployee[]>response.json())
            .map(this.extractData)
            .do(data => console.log("Edit response: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteEmployee(employeeObject: Object): Observable<IEmployee[]> {
        return this._http.post(this.apiBase + this._deleteEmployeeUrl, employeeObject)
        // .map((response: Response) => <IEmployee[]>response.json())
        .map(this.extractData)
        .do(data => console.log("Delete Response: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    private handleError(error: Response){
        console.log("Error>>", error);
        return Observable.throw(error.json().error || 'Server error')
    }

    private extractData(res: Response){
         let body = res.json();
         console.log("success>>", body);
        return body.response.data || { };
    }
    
}