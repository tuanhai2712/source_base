import i18n from '@/i18n';
import {
  DASHBOARD_ROUTER,
  GANTT_CHART,
  INTERNAL_LOG,
  KANBAN_CHART,
  ROLE_LIST_ROUTER,
  SYSTEM_LOG,
  USER_LIST_ROUTER,
} from '@/routes/constants';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

export const menuSidebar = [
  {
    id: 1,
    is_group: false,
    title: i18n.t('route.dashboard'),
    path: DASHBOARD_ROUTER,
    icon: MenuOutlined,
    roles: [],
    items: [],
  },
  {
    id: 2,
    is_group: true,
    title: i18n.t('route.systemManagement'),
    icon: UserOutlined,
    roles: [],
    items: [
      {
        id: 1,
        title: i18n.t('route.userManagement'),
        path: USER_LIST_ROUTER,
        roles: [],
      },
      {
        id: 2,
        title: i18n.t('route.roleManagement'),
        path: ROLE_LIST_ROUTER,
        roles: [],
      },
    ],
  },
  {
    id: 3,
    is_group: true,
    title: i18n.t('route.logManagement'),
    icon: UserOutlined,
    roles: [],
    items: [
      {
        id: 1,
        title: i18n.t('route.systemLog'),
        path: SYSTEM_LOG,
        roles: [],
      },
      {
        id: 2,
        title: i18n.t('route.internalLog'),
        path: INTERNAL_LOG,
        roles: [],
      },
    ],
  },
  {
    id: 4,
    is_group: true,
    title: i18n.t('Chart'),
    icon: UserOutlined,
    roles: [],
    items: [
      {
        id: 1,
        title: i18n.t('Gantt chart'),
        path: GANTT_CHART,
        roles: [],
      },
      {
        id: 2,
        title: i18n.t('Kanban chart'),
        path: KANBAN_CHART,
        roles: [],
      },
    ],
  },
];
