export interface IProfile {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  phonenumber: string;
  isSuperAdmin: boolean;
  permissions: [];
}

export interface IFiledsFormProdile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phonenumber: string;
}

export interface IFormChangePasswordProfiles {
  oldPassword: string;
  password: string;
}

export interface IParamAPIConnection {
  apiKey: string;
  apiSecret: string;
  passphrase?: string;
}

export interface IDataAPIConnection {
  id: number;
  apiKey: string;
}

export interface IDataWalletAddress {
  walletAddress: string;
}
export interface IParamChangeStatusUser {
  userIds: number[];
  status: string;
}

export interface IResponseLogin {
  accessToken: string;
  expiresIn: 0;
  refreshToken: string;
}
