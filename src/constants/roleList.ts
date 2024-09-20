import i18n from '@/i18n';

export interface IOption {
  children: { label: string; value: string }[];
  label: string;
  value: string;
  isShowOneRow?: boolean;
}

export interface IListRole {
  label: string;
  options: IOption[];
  valueModule: string;
}

export const LIST_LAST_WORD_PERMISSIONS = {
  VIEW: 'v',
};
export interface SelectedOptions {
  [key: string]: string[];
}
export const LIST_ROLE = (): IListRole[] => [
  // product
  {
    label: i18n.t('role.products'),
    valueModule: 'product',
    options: [
      {
        label: '',
        value: 'product',
        children: [
          {
            label: i18n.t('role.view'),
            value: LIST_PERMISSIONS.V_PRODUCT,
          },
          {
            label: i18n.t('role.import'),
            value: LIST_PERMISSIONS.I_PRODUCT,
          },
          {
            label: i18n.t('role.exportExcel'),
            value: LIST_PERMISSIONS.E_PRODUCT,
          },
          {
            label: i18n.t('role.edit'),
            value: LIST_PERMISSIONS.U_PRODUCT,
          },
        ],
      },
    ],
  },

  // process
  {
    label: i18n.t('role.process'),
    valueModule: 'process',
    options: [
      {
        label: '',
        value: 'process',
        children: [
          {
            label: i18n.t('role.view'),
            value: LIST_PERMISSIONS.V_PROCESS,
          },
          {
            label: i18n.t('role.import'),
            value: LIST_PERMISSIONS.I_PROCESS,
          },
          {
            label: i18n.t('role.sysnCataLogProcess'),
            value: LIST_PERMISSIONS.SY_PROCESS_CATALOG,
          },
          {
            label: i18n.t('role.synsProcessProduct'),
            value: LIST_PERMISSIONS.SY_PROCESS_PRODUCT,
          },
          {
            label: i18n.t('role.exportExcel'),
            value: LIST_PERMISSIONS.E_PROCESS,
          },
        ],
      },
    ],
  },

  // completion - rate
  {
    label: i18n.t('role.completionRate'),
    valueModule: 'com_rate',
    options: [
      {
        label: '',
        value: 'com_rate',
        children: [
          { label: i18n.t('role.view'), value: LIST_PERMISSIONS.V_COMPLETION_RATE },
          { label: i18n.t('role.import'), value: LIST_PERMISSIONS.I_COMPLETION_RATE },
          { label: i18n.t('role.exportExcel'), value: LIST_PERMISSIONS.E_COMPLETION_RATE },
        ],
      },
    ],
  },

  // work result
  {
    label: i18n.t('role.workResult'),
    valueModule: 'work_result',
    options: [
      {
        label: '',
        value: 'work_result',
        children: [
          { label: i18n.t('role.view'), value: LIST_PERMISSIONS.V_WORK_RESULT },

          { label: i18n.t('role.synsFromTransAm'), value: LIST_PERMISSIONS.SY_WORK_RESULT },
          { label: i18n.t('role.exportExcel'), value: LIST_PERMISSIONS.E_WORK_RESULT },
        ],
      },
    ],
  },

  // inventory
  {
    label: i18n.t('role.inventory'),
    valueModule: 'inventory',
    options: [
      {
        label: '',
        value: 'inventory',
        children: [
          { label: i18n.t('role.view'), value: LIST_PERMISSIONS.V_INVENTORY },
          { label: i18n.t('role.import'), value: LIST_PERMISSIONS.I_INVENTORY },
          { label: i18n.t('role.exportExcel'), value: LIST_PERMISSIONS.E_INVENTORY },
        ],
      },
    ],
  },

  // order
  {
    label: i18n.t('role.order'),
    valueModule: 'order',
    options: [
      {
        label: '',
        value: 'order',
        children: [
          { label: i18n.t('role.view'), value: LIST_PERMISSIONS.V_ORDER },
          { label: i18n.t('role.import'), value: LIST_PERMISSIONS.I_ORDER },
          { label: i18n.t('role.exportExcel'), value: LIST_PERMISSIONS.E_ORDER },
          { label: i18n.t('role.createWorkPlan'), value: LIST_PERMISSIONS.C_WORK_PLAN_ORDER },
        ],
      },
    ],
  },

  // work plan
  {
    label: i18n.t('role.workPlan.main'),
    valueModule: 'work_plan',
    options: [
      {
        label: i18n.t('role.workPlan.info'),
        value: 'work_plan_info',
        children: [
          { label: i18n.t('role.view'), value: LIST_PERMISSIONS.V_INFO_WORK_PLAN },
          { label: i18n.t('role.exportExcel'), value: LIST_PERMISSIONS.E_INFO_WORK_PLAN },
          { label: i18n.t('role.approve'), value: LIST_PERMISSIONS.AP_INFO_WORK_PLAN },
        ],
      },
      {
        label: i18n.t('role.workPlan.historyFile'),
        value: 'work_plan_history',
        children: [
          { label: i18n.t('role.view'), value: LIST_PERMISSIONS.V_HISTORY_WORK_PLAN },
          { label: i18n.t('role.downloadFile'), value: LIST_PERMISSIONS.E_HISTORY_WORK_PLAN },
          { label: i18n.t('role.deleteFile'), value: LIST_PERMISSIONS.D_HISTORY_WORK_PLAN },
        ],
      },
    ],
  },

  // report
  {
    label: i18n.t('role.report.main'),
    valueModule: 'rp',
    options: [
      {
        label: i18n.t('role.report.quantityReport'),
        value: 'rp_quantity',
        children: [
          {
            label: i18n.t('role.view'),
            value: LIST_PERMISSIONS.V_REPORT_QUANTITY,
          },
          {
            label: i18n.t('role.exportExcel'),
            value: LIST_PERMISSIONS.E_REPORT_QUANTITY,
          },
          {
            label: i18n.t('role.calculateQuantity'),
            value: LIST_PERMISSIONS.CA_REPORT_QUANTITY,
          },
          {
            label: i18n.t('role.lockedQuantity'),
            value: LIST_PERMISSIONS.LOCK_REPORT_QUANTITY,
          },
        ],
      },
      {
        label: i18n.t('role.report.reportExportItem'),
        value: 'rp_export_item',
        children: [
          {
            label: i18n.t('role.view'),
            value: LIST_PERMISSIONS.V_REPORT_EXPORT_ITEM,
          },
          {
            label: i18n.t('role.exportExcel'),
            value: LIST_PERMISSIONS.E_REPORT_EXPORT_ITEM,
          },
          {
            label: i18n.t('role.import'),
            value: LIST_PERMISSIONS.I_REPORT_EXPORT_ITEM,
          },
        ],
      },
      {
        label: i18n.t('role.report.costMaterial'),
        value: 'cost_material',
        children: [
          {
            label: i18n.t('role.view'),
            value: LIST_PERMISSIONS.V_REPORT_COST_MATERIAL,
          },
          {
            label: i18n.t('role.exportExcel'),
            value: LIST_PERMISSIONS.E_REPORT_COST_MATERIAL,
          },
          {
            label: i18n.t('role.import'),
            value: LIST_PERMISSIONS.I_REPORT_COST_MATERIAL,
          },
        ],
      },
    ],
  },
  {
    label: i18n.t('role.systemManagement.main'),
    valueModule: 'stm',
    options: [
      {
        label: i18n.t('role.systemManagement.userManagement'),
        value: 'u',
        children: [
          { label: i18n.t('role.view'), value: LIST_PERMISSIONS.V_USER },
          { label: i18n.t('role.create'), value: LIST_PERMISSIONS.C_USER },
          { label: i18n.t('role.edit'), value: LIST_PERMISSIONS.U_USER },
          { label: i18n.t('role.delete'), value: LIST_PERMISSIONS.D_USER },
        ],
      },
      {
        label: i18n.t('role.systemManagement.roleManagement'),
        value: 'r',
        children: [
          { label: i18n.t('role.view'), value: LIST_PERMISSIONS.V_ROLE },
          { label: i18n.t('role.create'), value: LIST_PERMISSIONS.C_ROLE },
          { label: i18n.t('role.edit'), value: LIST_PERMISSIONS.U_ROLE },
          { label: i18n.t('role.delete'), value: LIST_PERMISSIONS.D_ROLE },
        ],
      },
    ],
  },
];

export const LIST_PERMISSIONS = {
  // user
  V_USER: 'u.v',
  C_USER: 'u.c',
  U_USER: 'u.u',
  D_USER: 'u.d',
  // roles
  V_ROLE: 'r.v',
  C_ROLE: 'r.c',
  U_ROLE: 'r.u',
  D_ROLE: 'r.d',

  // logs
  V_LOG: 'log.v',

  // products
  V_PRODUCT: 'product.v',
  I_PRODUCT: 'product.i',
  E_PRODUCT: 'product.e',
  U_PRODUCT: 'product.u',

  // process
  V_PROCESS: 'process.v',
  I_PROCESS: 'process.i',
  E_PROCESS: 'process.e',
  SY_PROCESS_CATALOG: 'process.sy_catalog',
  SY_PROCESS_PRODUCT: 'process.sy_product',

  // completion - rate
  V_COMPLETION_RATE: 'com_rate.v',
  I_COMPLETION_RATE: 'com_rate.i',
  E_COMPLETION_RATE: 'com_rate.e',

  // order
  V_ORDER: 'order.v',
  I_ORDER: 'order.i',
  E_ORDER: 'order.e',
  C_WORK_PLAN_ORDER: 'order.c',

  //work plan
  V_INFO_WORK_PLAN: 'work_plan_info.v',
  E_INFO_WORK_PLAN: 'work_plan_info.e',
  AP_INFO_WORK_PLAN: 'work_plan_info.ap',

  V_HISTORY_WORK_PLAN: 'work_plan_history.v',
  D_HISTORY_WORK_PLAN: 'work_plan_history.d',
  E_HISTORY_WORK_PLAN: 'work_plan_history.e',

  //work result
  V_WORK_RESULT: 'work_result.v',
  E_WORK_RESULT: 'work_result.e',
  SY_WORK_RESULT: 'work_result.sy',

  // inventory
  V_INVENTORY: 'inventory.v',
  E_INVENTORY: 'inventory.e',
  I_INVENTORY: 'inventory.i',

  // report
  V_REPORT_QUANTITY: 'rp_quantity.v',
  E_REPORT_QUANTITY: 'rp_quantity.e',
  CA_REPORT_QUANTITY: 'rp_quantity.ca',
  LOCK_REPORT_QUANTITY: 'rp_quantity.lock',

  V_REPORT_EXPORT_ITEM: 'rp_export_item.v',
  E_REPORT_EXPORT_ITEM: 'rp_export_item.e',
  I_REPORT_EXPORT_ITEM: 'rp_export_item.i',

  V_REPORT_COST_MATERIAL: 'cost_material.v',
  E_REPORT_COST_MATERIAL: 'cost_material.e',
  I_REPORT_COST_MATERIAL: 'cost_material.i',
};
