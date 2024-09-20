import React from 'react';

import { SlashIcon } from '@/assets';
import { Breadcrumb } from 'antd';
import upperFirst from 'lodash/upperFirst';
import { useLocation } from 'react-router-dom';
import { menuSidebar } from '../Layout/constants';
import _ from 'lodash';
interface IBreadcrumb {}

export const Breadcrumbs: React.FC<IBreadcrumb> = () => {
  const location = useLocation();

  const formatBreadcrumb = (bc: string) => bc.split('-').join(' ');

  const pathCreation = (arr: Array<string>) => {
    return arr.map((item, index) => {
      return {
        name: item,
        path: '/'.concat(arr.slice(0, index + 1).join('/')),
      };
    });
  };
  const pathArray = pathCreation(location.pathname.split('/'));
  console.log(pathArray);
  const listItem = pathArray?.map((item) => upperFirst(formatBreadcrumb(item.name)));

  const renderLink = (name: string) => {
    const dataSource = [...menuSidebar];
    const linkOld = `/${name.toLowerCase().replace(/ /g, '-')}`;
    let path = '';
    const loop = (data: any, itemName: string, callback: (res: any) => void) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].path && data[i].path.includes(itemName)) {
          return callback(data[i]);
        }
        if (data[i].items) {
          loop(data[i].items, itemName, callback);
        }
      }
    };
    loop(dataSource, linkOld, (res: any) => {
      if (res.path) {
        path = res.path;
      }
    });
    return path;
  };

  const breadcrumbItems = _.compact(listItem).map((item, index) => {
    if (index + 1 === _.compact(listItem).length) {
      return { title: item };
    } else {
      return { title: item, href: renderLink(item) };
    }
  });

  return <Breadcrumb separator={<SlashIcon />} items={breadcrumbItems} />;
};
