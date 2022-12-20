import { EmployeeModel } from "./EmployeeModel";

export interface OrganizationModel {
    orgId?: number;
    orgLocation: string;
    orgName: string;
    orgType: string;
    employee?: EmployeeModel;
}