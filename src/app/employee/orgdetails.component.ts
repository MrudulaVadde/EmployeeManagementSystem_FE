import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { organization } from 'src/organization';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-orgdetails',
  templateUrl: './orgdetails.component.html',
  styleUrls: ['./orgdetails.component.css']
})
export class OrgdetailsComponent implements OnInit {
  id?:number;
  org1:organization;

  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient,public ser:EmployeeService) { }

  ngOnInit(): void {
    let idparam=this.activatedRoute.snapshot.paramMap.get('id');
    this.id=idparam?+idparam:0;
    this.ser.getOrgDetails(this.id).subscribe(
      data=>{
        this.org1=data;
      }
    );
  
  }

}
