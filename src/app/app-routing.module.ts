import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './screens/employee/employee.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { RedirectComponent } from './screens/redirect/redirect.component';
import { OrganizationComponent } from './screens/organization/organization.component';

const routes: Routes = [
  { path: "", component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: "employee", component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: "organization/:empId", component: OrganizationComponent, canActivate: [AuthGuard] },
  { path: "**", component: RedirectComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
