import { IRoleDetails } from '../role-list';

export interface IUserStatistic {
  todayReferedUser: string;
  totalReferedUser: string;
}

export interface IUserList {
  email: string;
  id: string;
  userName: string;
  fullName: string;
  phoneNumber: string;
  roles: IRoleDetails[];
}

export interface IFormChangePasswordUser {
  password: string;
}
