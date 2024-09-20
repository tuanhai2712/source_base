export const SIGN_IN_ROUTER = '/sign-in';
export const FORGOT_PASSWORD_ROUTER = '/forgot-password';
export const CONFIRM_OTP_ROUTER = '/confirm-otp';
export const REGISTER_ROUTER = '/register';
export const SYSTEM_MANAGEMENT = '/system-management';
export const LOG_MANAGEMENT = '/log-management';
export const CHART = '/chart';

// user management
export const DASHBOARD_ROUTER = '/dashboard';
export const USER_LIST_ROUTER = SYSTEM_MANAGEMENT + '/user-list';
export const USER_DETAIL_ROUTER = USER_LIST_ROUTER + '/user-detail';

//role management
export const ROLE_LIST_ROUTER = SYSTEM_MANAGEMENT + '/role-list';

//log management
export const SYSTEM_LOG = LOG_MANAGEMENT + '/system-log';
export const INTERNAL_LOG = LOG_MANAGEMENT + '/internal-log';

// chart
export const GANTT_CHART = CHART + '/gantt';
export const KANBAN_CHART = CHART + '/kanban';
