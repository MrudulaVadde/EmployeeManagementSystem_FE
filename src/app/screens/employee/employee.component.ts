import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { EmployeeModel } from 'src/app/model/EmployeeModel';
import { EmployeeService } from '../services/EmployeeService';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  email: string|undefined;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router,
    public auth: AuthService,
              @Inject(DOCUMENT) private doc: Document
    ) { }

  pageType: string = "details";
  isError: boolean = false;
  isSuccess: boolean = false;
  isDeleted: boolean = false;

  employeeDetails: any[] = [];

  oneEmployeeDetails: EmployeeModel = {
    empEmail: "",
    empName: "",
    empPhone: "",
    gender: "",
    salary: 0,
    empId: 0
  };

  ngOnInit(): void {
    this.auth?.user$.subscribe(
      (a:any) => {
        this.email = a.email
        console.log(a)});
    this.employeeForm = this.fb.group({
      empName: ['', Validators.required],
      empEmail: ['', Validators.required],
      gender: ['', Validators.required],
      empPhone: ['', Validators.required],
      salary: ['', Validators.required],
    });
    const resData: any[] = [];
    this.employeeService.getAllEmployeeDetails().subscribe((res: EmployeeModel[]) => {
      if (res && res.length > 0) {
        res.forEach((data, index) => {
          resData.push({ sNo: ++index, ...data })
        })
        this.employeeDetails = resData;
      } else {
        this.employeeDetails = [];
      }
    });
  }

  goToOrg(empId: number): void {
    this.router.navigate([`/organization/${empId}`]);
  }

  handleAdd(): void {
    this.isError = false;
    this.isSuccess = false;
    this.pageType = 'add';
    this.isDeleted = false;
    this.employeeForm = this.fb.group({
      empName: ['', Validators.required],
      empEmail: ['', Validators.required],
      gender: ['', Validators.required],
      empPhone: ['', Validators.required],
      salary: ['', Validators.required],
    })
  }

  handleDetails(): void {
    this.pageType = 'details'
    this.isSuccess = false;
    this.isDeleted = false;
    const resData: any[] = [];
    this.employeeService.getAllEmployeeDetails().subscribe((res: EmployeeModel[]) => {
      if (res && res.length > 0) {
        res.forEach((data, index) => {
          resData.push({ sNo: ++index, ...data })
        })
        this.employeeDetails = resData;
      } else {
        this.employeeDetails = [];
      }
    });
  }

  handleUpdate(empId: number): void {
    this.pageType = 'update';
    this.isError = false;
    this.isSuccess = false;
    this.isDeleted = false;
    this.employeeService.getEmployeeDetails(empId).subscribe((resData: EmployeeModel) => {
      this.oneEmployeeDetails = resData
      this.employeeForm = this.fb.group({
        empName: [resData.empName, Validators.required],
        empEmail: [resData.empEmail, Validators.required],
        gender: [resData.gender, Validators.required],
        empPhone: [resData.empPhone, Validators.required],
        salary: [resData.salary, Validators.required],
      })
    })
  }

  handleDelete(empId: number): void {
    this.employeeService.deleteEmployeeDetails(empId).subscribe((resData: any) => {
      if (resData) {
        const resData: any[] = [];
        this.isDeleted = true;
        setTimeout(() => {
          this.isDeleted = false;
        }, 1500);
        this.employeeService.getAllEmployeeDetails().subscribe((res: EmployeeModel[]) => {
          if (res && res.length > 0) {
            res.forEach((data, index) => {
              resData.push({ sNo: ++index, ...data })
            })
            this.employeeDetails = resData;
          } else {
            this.employeeDetails = [];
          }
        });
      } else {
        this.isDeleted = false;
      }
    })

  }

  get employeeFormControl() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    const { empName, empEmail, gender, empPhone, salary } = this.employeeForm.value;
    if (empName && empEmail && gender && empPhone && salary) {
      this.isError = false
      if (this.pageType === 'add') {
        this.employeeService.saveEmployeeDetails({ empName, empEmail, empPhone, gender, salary }).subscribe(res => {
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
          }, 1500);
          this.employeeForm = this.fb.group({
            empName: ['', Validators.required],
            empEmail: ['', Validators.required],
            gender: ['', Validators.required],
            empPhone: ['', Validators.required],
            salary: ['', Validators.required],
          })
        })
      } else if (this.pageType === 'update') {
        const empId = this.oneEmployeeDetails.empId;
        this.employeeService.updateEmployeeDetails({ empId, empName, empEmail, empPhone, gender, salary }).subscribe(res => {
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
          }, 1500);
          this.employeeForm = this.fb.group({
            empName: ['', Validators.required],
            empEmail: ['', Validators.required],
            gender: ['', Validators.required],
            empPhone: ['', Validators.required],
            salary: ['', Validators.required],
          })
        })
      }
    } else {
      this.isError = true;
    }
  }

}
