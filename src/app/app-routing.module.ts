import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { OrgdetailsComponent } from './employee/orgdetails.component';

const routes: Routes = [
  {
    path:'employee',
    component:EmployeeComponent
  },
  {
    path:'orgdetails/:id',
    component: OrgdetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
