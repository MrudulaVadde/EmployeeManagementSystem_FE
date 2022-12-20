import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { EmployeeComponent } from './screens/employee/employee.component';
import { OrganizationComponent } from './screens/organization/organization.component';
import { RedirectComponent } from './screens/redirect/redirect.component';
import { EmployeeService } from './screens/services/EmployeeService';

import { AlertModule } from 'ngx-bootstrap/alert';
import { OrganizationService } from './screens/services/OrganizationService';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { LogoutButtonComponent } from './components/signout-button.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    OrganizationComponent,
    RedirectComponent,
    LogoutButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    PopoverModule.forRoot(),
    ButtonsModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-mskzqyu5s8bqgo3a.us.auth0.com',
      clientId: 'vihXLM50ddlby2pxj5tA3FpkRGTmvVAR'
    }),
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [EmployeeService, OrganizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
