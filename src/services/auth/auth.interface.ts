export interface IParamLogin {
  userName: string;
  password: string;
}

export interface IParamRegister {
  userName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  isSuperAdmin: boolean;
}

export interface IResponseAuth {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
