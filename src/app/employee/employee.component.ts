import { Component, OnInit } from '@angular/core';
import { employee } from 'src/employee';
import { organization } from 'src/organization';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

    org:organization[]=[];
    emp:employee;

  constructor(private service:EmployeeService) { }

  ngOnInit(): void {
    this.emp=new employee();
  }

  getEmployee(){
    this.service.getEmployee().subscribe(
      data=>{
        this.org=data
      });
  }

}