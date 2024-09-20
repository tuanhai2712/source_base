import { MenuProps } from 'antd';

export interface IPropsLayoutMain {
  children: React.ReactNode;
}
export interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

export type MenuItemType = Required<MenuProps>['items'][number];
