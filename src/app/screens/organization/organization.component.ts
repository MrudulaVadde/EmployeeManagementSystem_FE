import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationModel } from 'src/app/model/OrganizationModel';
import { OrganizationService } from '../services/OrganizationService';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizationForm: FormGroup;
  empId: number = 0;
  orgId: number = 0;
  organizatinDetails: any[] = [];
  pageType: string = 'details';
  isDeleted: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;

  oneOrganizationDetails: OrganizationModel = {
    orgLocation: "",
    orgName: "",
    orgType: ""
  }

  constructor(private fb: FormBuilder, private organizationService: OrganizationService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((result: any) => {
      this.empId = result['empId'];
      this.organizationService.getAllOrganizationDetails(this.empId).subscribe((response: any[]) => {
        if (response && response.length > 0) {
          const dataArr: any[] = [];
          response.forEach((rec: OrganizationModel, index: number) => dataArr.push({ sno: ++index, ...rec }));
          this.organizatinDetails = dataArr;
        } else {
          this.organizatinDetails = [];
        }
      });
    });

    this.organizationForm = this.fb.group({
      orgName: ['', Validators.required],
      orgType: ['', Validators.required],
      orgLocation: ['', Validators.required]
    });
  }

  handleGoBack(): void {
    this.router.navigate(['/employee'])
  }

  handleDetails(): void {
    this.pageType = 'details';
    this.isError = false;
    this.isSuccess = false;
    this.isDeleted = false;
    this.activatedRoute.params.subscribe((result: any) => {
      this.empId = result['empId'];
      this.organizationService.getAllOrganizationDetails(this.empId).subscribe((response: any[]) => {
        if (response && response.length > 0) {
          const dataArr: any[] = [];
          response.forEach((rec: OrganizationModel, index: number) => dataArr.push({ sno: ++index, ...rec }));
          this.organizatinDetails = dataArr;
        } else {
          this.organizatinDetails = [];
        }
      });
    });
  }

  handleAdd(): void {
    this.isError = false;
    this.isSuccess = false;
    this.pageType = 'add';
    this.isDeleted = false;
    this.organizationForm = this.fb.group({
      orgName: ['', Validators.required],
      orgType: ['', Validators.required],
      orgLocation: ['', Validators.required]
    });
  }

  handleUpdate(orgId: number): void {
    this.pageType = 'update';
    this.isError = false;
    this.isSuccess = false;
    this.isDeleted = false;
    this.orgId = orgId;
    this.organizationService.getOrganizationDetails(this.empId, orgId).subscribe((resData: OrganizationModel) => {
      this.oneOrganizationDetails = resData
      this.organizationForm = this.fb.group({
        orgName: [resData.orgName, Validators.required],
        orgType: [resData.orgType, Validators.required],
        orgLocation: [resData.orgLocation, Validators.required],
      })
    });
  }

  handleDelete(orgId: number): void {

    this.organizationService.deleteOrganizationDetails(this.empId, orgId).subscribe((resData: any) => {
      if (resData) {
        this.isDeleted = true;
        setTimeout(() => {
          this.isDeleted = false;
        }, 1500);
        this.organizationService.getAllOrganizationDetails(this.empId).subscribe((response: any[]) => {
          if (response && response.length > 0) {
            const dataArr: any[] = [];
            response.forEach((rec: OrganizationModel, index: number) => dataArr.push({ sno: ++index, ...rec }));
            this.organizatinDetails = dataArr;
          } else {
            this.organizatinDetails = [];
          }
        });
      } else {
        this.isDeleted = false;
      }
    });


  }

  onSubmit(): void {
    const { orgName, orgType, orgLocation } = this.organizationForm.value;
    console.log(this.organizationForm.value)
    if (orgName && orgType && orgLocation) {
      this.isError = false
      if (this.pageType === 'add') {
        this.organizationService.saveOrganizationDetails({ empId: this.empId, organizationDetails: { orgName, orgType, orgLocation } }).subscribe(res => {
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
          }, 1500);
          this.organizationForm = this.fb.group({
            orgName: ['', Validators.required],
            orgType: ['', Validators.required],
            orgLocation: ['', Validators.required],
          });
        })
      } else if (this.pageType === 'update') {
        this.organizationService.updateOrganizationDetails({ empId: this.empId, organizationDetails: { orgId: this.orgId, orgName, orgType, orgLocation } }).subscribe(res => {
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
          }, 1500);
          this.organizationForm = this.fb.group({
            orgName: ['', Validators.required],
            orgType: ['', Validators.required],
            orgLocation: ['', Validators.required],
          });
        })
      }
    } else {
      this.isError = true;
    }
  }

}
