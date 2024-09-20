import i18n from '@/i18n';

export const DEFAULT_MONTH_FILTER = 12;

export enum UserRole {
  SuperAdmin = 'superadmin',
  Creator = 'creator',
  Marketing = 'marketing',
}

export enum MoneyDefault {
  USDT = 'USDT',
  BTC = 'BTC',
}

export enum StatusRequest {
  PENDING = 1,
  APPROVED,
  REJECTED,
}

export enum FormatTime {
  Date = 'DD/MM/YYYY',
  DateFull = 'DD/MM/YYYY HH:mm:ss',
  MonthYear = 'MM/YYYY',
}

export const ListStatus = [
  {
    id: 1,
    key: 'PENDING',
    name: 'Pending',
  },
  {
    id: 2,
    key: 'APPROVED',
    name: 'Approved',
  },
  {
    id: 3,
    key: 'REJECTED',
    name: 'Rejected',
  },
];

export const ListStatusVipPackage = [
  {
    id: 1,
    key: 'PENDING',
    name: 'Pending',
  },
  {
    id: 2,
    key: 'ACTIVE',
    name: 'Active',
  },
  {
    id: 3,
    key: 'EXPIRED',
    name: 'Expired',
  },
];

export enum StatusUser {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  LOCKED = 'locked',
}

export const listStatusUser = [
  {
    id: 1,
    key: 'inactive',
    name: 'Inactive',
  },
  {
    id: 2,
    key: 'active',
    name: 'Active',
  },
  {
    id: 3,
    key: 'locked',
    name: 'Locked',
  },
];

export const ObjStatusUserFilter = {
  label: 'Status',
  filterKey: 'status',
  items: [
    {
      name: 'All',
      key: '',
    },
    {
      name: 'Active',
      key: StatusUser.ACTIVE,
    },
    {
      name: 'Disabled',
      key: StatusUser.INACTIVE,
    },
    {
      name: 'Locked',
      key: StatusUser.LOCKED,
    },
  ],
};

export enum StatusVipPackageRequest {
  PENDING = 1,
  ACTIVE,
  EXPIRED,
}

export enum ERoleAdmin {
  SUPER_ADMIN = 'superadmin',
  TITAN_ADMIN = 'titan_admin',
  TOP_TRADING_ADMIN = 'top_trading_admin',
}

export enum EBotPackageType {
  BASIC = '1',
  ADVANCE = '2',
  PREMIUM = '3',
  VIP = '4',
  PROFIT_SHARING = '5',
}

export enum EOrganizationPosition {
  NORMAL_USER = 'Titan Trading',
  STAFF = 'TT Bot',
  JUNIOR_MANAGER = 'TT Bot',
  TEAM_MANAGER = 'TT Bot',
  CENTER_DIRECTOR = 'TT Bot',
  REGIONAL_HEADQUATER_MANAGER = 'TT Bot',
}

export enum EOrganizationPositionTitle {
  NORMAL_USER = 'Normal user',
  STAFF = 'Staff',
  JUNIOR_MANAGER = 'Junior Manager',
  TEAM_MANAGER = 'Team Manager',
  CENTER_DIRECTOR = 'Center Director',
  REGIONAL_HEADQUATER_MANAGER = 'Regional Head Quater Manager',
}

export enum EPlatform {
  TITAN = 'titan',
  TOP_TRADING = 'top-trading',
}

export const ListSite = [
  { id: EPlatform.TITAN, name: 'Titan Trading' },
  { id: EPlatform.TOP_TRADING, name: 'Top Trading' },
];

export enum TransactionType {
  DEPOSIT = 1,
  WITHDRAW = 2,
  LOCK_IN_PROFIT_SHARING = 3,
  PURCHASE_PACKAGE = 4,
  COMMISSION = 5,
  PACKAGE_REFUND = 6,
  PROFIT_SHARING_REFUND = 7,
  COMMISSION_PAID = 8,
}

export enum StatusVipPackageKeys {
  PENDING = 1,
  ACTIVE = 2,
  EXPIRED = 3,
}
export const listStatusVipPackage = [
  {
    id: 1,
    key: StatusVipPackageKeys.ACTIVE,
    name: i18n.t('Package created'),
    color: '#039855',
  },
  {
    id: 2,
    key: StatusVipPackageKeys.PENDING,
    name: i18n.t('Pending'),
    color: '#DC6803',
  },
  {
    id: 3,
    key: StatusVipPackageKeys.EXPIRED,
    name: i18n.t('Expired'),
    color: '#F04438',
  },
];

export const ObjStatusVipPackage = {
  label: i18n.t('Module'),
  filterKey: 'module',
  items: [
    {
      name: 'All',
      key: '',
    },
    ...listStatusVipPackage,
  ],
};

export enum StatusClaimRequestKeys {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

export const listStatusClaimRequest = [
  {
    id: 1,
    key: StatusClaimRequestKeys.Approved,
    name: 'Approved',
    color: '#12B76A',
  },
  {
    id: 2,
    key: StatusClaimRequestKeys.Pending,
    name: 'Pending',
    color: '#FDB022',
  },
  {
    id: 3,
    key: StatusClaimRequestKeys.Rejected,
    name: 'Rejected',
    color: '#F04438',
  },
];

export const ObjStatusClaimRequestFilter = {
  label: 'Status',
  filterKey: 'status',
  items: [
    {
      name: 'All',
      key: '',
    },
    {
      name: 'Approved',
      key: StatusClaimRequestKeys.Approved,
    },
    {
      name: 'Rejected',
      key: StatusClaimRequestKeys.Rejected,
    },
    {
      name: 'Pending',
      key: StatusClaimRequestKeys.Pending,
    },
  ],
};

export enum StatusKeys {
  Inactive = 'inactive',
  Active = 'active',
}

export const listStatusSubAffilicate = [
  {
    id: 1,
    key: StatusKeys.Active,
    name: 'Active',
  },
  {
    id: 2,
    key: StatusKeys.Inactive,
    name: 'Disabled',
  },
];

export const ObjMemberGradeFilter = {
  label: 'Member grade',
  filterKey: 'packageType',
  items: [
    {
      name: 'All',
      key: '',
    },
    {
      name: 'Profit sharing member',
      key: EBotPackageType.PROFIT_SHARING,
    },
    {
      name: 'Basic member',
      key: EBotPackageType.BASIC,
    },
    {
      name: 'Advanced member',
      key: EBotPackageType.ADVANCE,
    },
    {
      name: 'Premium member',
      key: EBotPackageType.PREMIUM,
    },
    {
      name: 'VIP member',
      key: EBotPackageType.VIP,
    },
  ],
};

export enum BotShowType {
  PURCHASE_PACKAGE = 1,
  PROFIT_SHARING,
}

export const ObjStatusFilter = {
  label: 'Status',
  filterKey: 'status',
  items: [
    {
      name: 'All',
      key: '',
    },
    {
      name: 'Active',
      key: StatusKeys.Active,
    },
    {
      name: 'Disabled',
      key: StatusKeys.Inactive,
    },
  ],
};

export const ObjRangeDateTimeFilter = {
  label: 'Time',
  filterKey: ['startTime', 'endTime'],
  type: 'date',
};

export enum EAcitivityLogModule {
  USER_LIST = 'USER_LIST',
  WITHDRAWAL_REQUEST = 'WITHDRAWAL_REQUEST',
  VIP_PACKAGE_TRACKING = 'VIP_PACKAGE_TRACKING',
  TRANSACTION_REQUEST_TRACKING = 'TRANSACTION_REQUEST_TRACKING',
  MKT_COMPANY = 'MKT_COMPANY',
  COMMISION_CLAIM = 'COMMISION_CLAIM',
}

export const listAcitivityLogModule = [
  {
    id: 1,
    key: EAcitivityLogModule.USER_LIST,
    name: i18n.t('User list'),
  },
  {
    id: 2,
    key: EAcitivityLogModule.WITHDRAWAL_REQUEST,
    name: i18n.t('Withdrawal request'),
  },
  {
    id: 3,
    key: EAcitivityLogModule.VIP_PACKAGE_TRACKING,
    name: i18n.t('VIP package tracking'),
  },
  {
    id: 4,
    key: EAcitivityLogModule.TRANSACTION_REQUEST_TRACKING,
    name: i18n.t('Transaction request tracking'),
  },
  {
    id: 5,
    key: EAcitivityLogModule.MKT_COMPANY,
    name: i18n.t('Marketing company'),
  },
  {
    id: 6,
    key: EAcitivityLogModule.COMMISION_CLAIM,
    name: i18n.t('Commission claim'),
  },
];

export const ObjAcitivityLogModule = {
  label: i18n.t('Module'),
  filterKey: 'module',
  items: [
    {
      name: 'All',
      key: '',
    },
    ...listAcitivityLogModule,
  ],
};

export const listTransactionType = [
  {
    id: 1,
    key: TransactionType.DEPOSIT,
    name: i18n.t('Deposit'),
  },
  {
    id: 2,
    key: TransactionType.WITHDRAW,
    name: i18n.t('Withdrawal'),
  },
];
export const ObjTransactionType = {
  label: i18n.t('Transaction type'),
  filterKey: 'type',
  items: [
    {
      name: 'All',
      key: '',
    },
    ...listTransactionType,
  ],
};

export enum ENetwork {
  BEP20 = 1,
  ERC20,
  TRC20,
}

export const listNetWork = [
  {
    id: 1,
    key: ENetwork.BEP20,
    name: 'Binance Smart Chain',
  },
  {
    id: 2,
    key: ENetwork.ERC20,
    name: 'Ethereum',
  },
  {
    id: 3,
    key: ENetwork.TRC20,
    name: 'Tron',
  },
];

export enum StatusTransactionRequestKeys {
  WAITING = 1,
  INPROGRESS,
  APPROVED,
  REJECT,
  EXPIRED,
}
export const listStatusTransactionRequest = [
  {
    id: 1,
    key: StatusTransactionRequestKeys.APPROVED,
    name: i18n.t('Approved'),
    color: '#039855',
  },
  {
    id: 2,
    key: StatusTransactionRequestKeys.REJECT,
    name: i18n.t('Rejected'),
    color: '#F04438',
  },
  {
    id: 3,
    key: StatusTransactionRequestKeys.EXPIRED,
    name: i18n.t('Expired'),
    color: '#F04438',
  },
  {
    id: 4,
    key: StatusTransactionRequestKeys.INPROGRESS,
    name: i18n.t('In progress'),
    color: '#DC6803',
  },
  {
    id: 5,
    key: StatusTransactionRequestKeys.WAITING,
    name: i18n.t('Pending'),
    color: '#DC6803',
  },
];
export const ObjStatusTransactionRequest = {
  label: i18n.t('Status'),
  filterKey: 'status',
  items: [
    {
      name: 'All',
      key: '',
    },
    ...listStatusTransactionRequest,
  ],
};

export enum StatusApproveRequestKeys {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

export const listStatusApproveRequest = [
  {
    id: 1,
    key: StatusApproveRequestKeys.Approved,
    name: 'Approved',
    color: '#12B76A',
  },
  {
    id: 2,
    key: StatusApproveRequestKeys.Pending,
    name: 'Pending',
    color: '#FDB022',
  },
  {
    id: 3,
    key: StatusApproveRequestKeys.Rejected,
    name: 'Rejected',
    color: '#F04438',
  },
];

export const netWorks = [
  {
    id: 1,
    name: 'BEP20',
    value: 1,
  },
  // {
  //   id: 2,
  //   name: 'ERC20',
  //   value: 2,
  // },
  // {
  //   id: 3,
  //   name: 'TRC20 (only USDT)',
  //   value: 3,
  // },
];

export const FORMAT_PASSWORD = /^(?=.{6,})(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W])\S+$/;

export const FORMAT_PHONENUMBER = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g;

export const CANNOT_COTAIN_SPECIAL_CHARACTERS = /^[a-zA-Z0-9_]+$/;

export const DATE_FORMAT = {
  HH_MM: 'HH:mm',
  FULL_DATE_TIME: 'YYYY-MM-DD',
  FULL_COMPLETE_TIMESTAMP: 'YYYY-MM-DD HH:mm',
  FULL_COMPLETE_TIMESTAMP_SECONDS: 'DD-MM-YYYY HH:mm:ss',
  YEAR: 'YYYY',
  MONTH: 'YYYY-MM',
};
