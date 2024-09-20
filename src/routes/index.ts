import React from 'react';

import {
  CONFIRM_OTP_ROUTER,
  DASHBOARD_ROUTER,
  FORGOT_PASSWORD_ROUTER,
  GANTT_CHART,
  INTERNAL_LOG,
  KANBAN_CHART,
  REGISTER_ROUTER,
  ROLE_LIST_ROUTER,
  SIGN_IN_ROUTER,
  SYSTEM_LOG,
  USER_LIST_ROUTER,
} from './constants';

const Login = React.lazy(() => import('@/pages/sign-in'));
const Register = React.lazy(() => import('@/pages/register'));
const ConfirmOTP = React.lazy(() => import('@/pages/confirm-otp'));
const ForgotPassword = React.lazy(() => import('@/pages/forgot-password'));
const UserList = React.lazy(() => import('@/pages/system-management/user-list'));
const RoleList = React.lazy(() => import('@/pages/system-management/role-list'));
const SystemLog = React.lazy(() => import('@/pages/log-management/system-log'));
const InternalLog = React.lazy(() => import('@/pages/log-management/internal-log'));
const GanttChart = React.lazy(() => import('@/pages/chart/gantt-chart'));
const KanbanChart = React.lazy(() => import('@/pages/chart/kanban-chart'));
const DashboardPage = React.lazy(() => import('@/pages/dashboard'));

export interface IRoute {
  Component: ((props: any) => JSX.Element) | React.FC<any>;
  isHelpcenter?: boolean;
  path?: string | string[];
  routePath?: string;
  from?: string;
  to?: string;
  exact?: boolean;
  roles: string[];
}

export const publicRoutes: IRoute[] = [
  {
    Component: Login,
    exact: true,
    path: SIGN_IN_ROUTER,
    routePath: SIGN_IN_ROUTER,
    roles: [],
  },
  {
    Component: Register,
    exact: true,
    path: REGISTER_ROUTER,
    routePath: REGISTER_ROUTER,
    roles: [],
  },
  {
    Component: ForgotPassword,
    exact: true,
    path: FORGOT_PASSWORD_ROUTER,
    routePath: FORGOT_PASSWORD_ROUTER,
    roles: [],
  },
  {
    Component: ConfirmOTP,
    exact: true,
    path: CONFIRM_OTP_ROUTER,
    routePath: CONFIRM_OTP_ROUTER,
    roles: [],
  },
  {
    Component: UserList,
    exact: true,
    path: [USER_LIST_ROUTER],
    routePath: USER_LIST_ROUTER,
    roles: [],
  },
  {
    Component: RoleList,
    exact: true,
    path: [ROLE_LIST_ROUTER],
    routePath: ROLE_LIST_ROUTER,
    roles: [],
  },
];
export const privateRoutes: IRoute[] = [
  {
    Component: DashboardPage,
    exact: true,
    path: [DASHBOARD_ROUTER],
    routePath: DASHBOARD_ROUTER,
    roles: [],
  },
  {
    Component: UserList,
    exact: true,
    path: [USER_LIST_ROUTER],
    routePath: USER_LIST_ROUTER,
    roles: [],
  },
  {
    Component: RoleList,
    exact: true,
    path: [ROLE_LIST_ROUTER],
    routePath: ROLE_LIST_ROUTER,
    roles: [],
  },
  {
    Component: SystemLog,
    exact: true,
    path: [SYSTEM_LOG],
    routePath: SYSTEM_LOG,
    roles: [],
  },
  {
    Component: InternalLog,
    exact: true,
    path: [INTERNAL_LOG],
    routePath: INTERNAL_LOG,
    roles: [],
  },
  {
    Component: GanttChart,
    exact: true,
    path: [GANTT_CHART],
    routePath: GANTT_CHART,
    roles: [],
  },
  {
    Component: KanbanChart,
    exact: true,
    path: [KANBAN_CHART],
    routePath: KANBAN_CHART,
    roles: [],
  },
];
