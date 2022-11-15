import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getEmployee(){
    return this.http.get<any>("http://localhost:8080/Employees");
  }

getOrgDetails(orgId:number){
  return this.http.get<any>(`http://localhost:8080/orgdetails/${orgId}`)
}
}