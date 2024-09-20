import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { menuSidebar } from './constants';
import { LevelKeysProps, MenuItemType } from './layout.interface';
import { useHistory } from 'react-router-dom';

const { Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItemType[],
): MenuItemType {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItemType;
}

const getMenuItems = () => {
  let menuItems = [] as MenuItemType[];
  for (let index = 0; index < menuSidebar.length; index++) {
    const element = menuSidebar[index] as any;
    let item = {} as MenuItemType;
    if (element.is_group) {
      let childrenItems = [] as MenuItemType[];
      for (let childIdx = 0; childIdx < element.items.length; childIdx++) {
        const childrenElement = element.items[childIdx];
        childrenItems.push(getItem(childrenElement.title, `${element.id}_${childrenElement.id}`));
      }
      item = getItem(element.title, element.id, <element.icon />, childrenItems);
    } else {
      item = getItem(element.title, element.id, <element.icon />);
    }
    menuItems.push(item);
  }
  return menuItems;
};
const getPathItem = (selectedKey?: any) => {
  let path: string = '';
  for (let index = 0; index < menuSidebar.length; index++) {
    const element = menuSidebar[index] as any;
    if (element.is_group) {
      for (let childIdx = 0; childIdx < element.items.length; childIdx++) {
        const childrenElement = element.items[childIdx];
        if (selectedKey === `${element.id}_${childrenElement.id}`) {
          path = childrenElement.path;
        }
      }
    } else {
      if (Number(selectedKey) === element.id) {
        path = element.path;
      }
    }
  }
  return path;
};

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number | string> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(getMenuItems() as LevelKeysProps[]);

export const Sidebar: React.FC<{}> = () => {
  const history = useHistory();

  const [collapsed, setCollapsed] = useState(false);
  const [stateOpenKeys, setStateOpenKeys] = useState(['0']);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  const onSelectMenu: MenuProps['onClick'] = (item: MenuItemType) => {
    if (getPathItem(item?.key)) history.push(getPathItem(item?.key));
  };

  return (
    <Sider
      width={300}
      className="sidebar-index"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical">Logo</div>
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={getMenuItems()}
        onClick={onSelectMenu}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
      />
    </Sider>
  );
};
