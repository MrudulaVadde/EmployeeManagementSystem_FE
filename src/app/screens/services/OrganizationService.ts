import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EmployeeModel } from 'src/app/model/EmployeeModel';
import { OrganizationModel } from 'src/app/model/OrganizationModel';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    constructor(private http: HttpClient) { }

    backendURL = 'https://q5ia4vs0t6.execute-api.us-east-2.amazonaws.com';

    getAllOrganizationDetails(empId: number): Observable<any> {
        return this.http.get(`${this.backendURL}/organization/all/details?empId=${empId}`);
    }

    getOrganizationDetails(empId: number, orgId: number): Observable<any> {
        return this.http.get(`${this.backendURL}/organization/details?empId=${empId}&orgId=${orgId}`);
    }

    saveOrganizationDetails(payload: { empId: number, organizationDetails: OrganizationModel }): Observable<any> {
        return this.http.post(`${this.backendURL}/organization/details`, payload);
    }

    updateOrganizationDetails(payload: { empId: number, organizationDetails: OrganizationModel }): Observable<any> {
        return this.http.put(`${this.backendURL}/organization/details`, payload);
    }

    deleteOrganizationDetails(empId: number, orgId: number): Observable<any> {
        return this.http.delete(`${this.backendURL}/organization/details?empId=${empId}&orgId=${orgId}`);
    }

}