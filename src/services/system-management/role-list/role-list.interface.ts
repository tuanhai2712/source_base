export interface IRoleList {
  id: string;
  name: string;
  description: string;
  userRolesCount: number;
  createdDate: string;
}

export interface IRoleDetails {
  roleId: string;
  permissions: string[];
  name: string;
  description: string;
}

export interface IParamRole {
  id?: string;
  name: string;
  description: string;
  permissions: string[];
}
