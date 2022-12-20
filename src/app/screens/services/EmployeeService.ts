import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EmployeeModel } from 'src/app/model/EmployeeModel';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private http: HttpClient) { }

    backendURL = 'https://q5ia4vs0t6.execute-api.us-east-2.amazonaws.com';

    getAllEmployeeDetails(): Observable<any> {
        return this.http.get(`${this.backendURL}/employee/all/details`);
    }

    getEmployeeDetails(empId: number): Observable<any> {
        return this.http.get(`${this.backendURL}/employee/details?empId=${empId}`);
    }

    saveEmployeeDetails(payload: EmployeeModel): Observable<any> {
        return this.http.post(`${this.backendURL}/employee/details`, payload);
    }

    updateEmployeeDetails(payload: EmployeeModel): Observable<any> {
        return this.http.put(`${this.backendURL}/employee/details`, payload);
    }

    deleteEmployeeDetails(empId: number): Observable<any> {
        return this.http.delete(`${this.backendURL}/employee/details?empId=${empId}`);
    }

}