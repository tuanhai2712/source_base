import React, { useCallback, useEffect, useState } from 'react';

import { EditIcon, SearchIcon } from '@/assets';
import ButtonExport from '@/components/Button/ButtonExport';
import PageTitle from '@/components/PageTitle';
import { FormatTime, InitPagination } from '@/constants';
import { useToggleValue } from '@/hooks';
import { IUserList, deleteUser, exportExcel, exportPdf, getUserList } from '@/services/system-management/user-list';
import { handleStringify } from '@/utils';
import { Button, Input, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { IFilter, TableParams } from './interface';
import DialogUser from './dialog-user';
import { DeleteFilled } from '@ant-design/icons';
import showModalConfirm from '@/utils/show-modal-confirm';
import dayjs from 'dayjs';

export const UserList: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const parsedQuery = queryString.parse(history.location.search);
  const { pageSize, pageIndex, searchTerm } = parsedQuery;
  const [dataTable, setDataTable] = useState<IUserList[]>([]);
  const [valueSearch, setValueSearch] = useState<string>(searchTerm ? String(searchTerm) : '');
  const [loading, setLoading] = useState(false);
  const [filterSelected, setFilterSelected] = useState<IFilter>({
    searchTerm: searchTerm ? String(searchTerm) : '',
    pageSize: pageSize ? Number(pageSize) : InitPagination.DEFAULT_PAGE_SIZE,
    pageIndex: pageIndex ? Number(pageIndex) : InitPagination.DEFAULT_PAGE,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: pageIndex ? Number(pageIndex) : InitPagination.DEFAULT_PAGE,
      pageSize: pageSize ? Number(pageSize) : InitPagination.DEFAULT_PAGE_SIZE,
    },
  });

  const [dialogUser, toggleDialogUser] = useToggleValue(false);
  const [recordEdited, setRecordEdited] = useState({} as IUserList);

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filterSelected)]);

  const handleExportExcel = async () => {
    const queryParams = [
      { key: 'pageIndex', value: String(filterSelected.pageIndex) },
      { key: 'limit', value: String(filterSelected.pageSize) },
      { key: 'searchTerm', value: String(filterSelected.searchTerm ?? '') },
    ];

    const response = await exportExcel(queryParams);
    if (response) {
      const fileBlob = response as any;
      const href = URL.createObjectURL(new Blob([fileBlob]));
      const element = document.createElement('a');
      element.href = href;
      element.setAttribute('download', `Userlist_${dayjs().format(FormatTime.Date)}.csv`);
      document.body.appendChild(element);
      element.click();
    }
  };

  const handleExportPdf = async () => {
    const queryParams = [
      { key: 'pageIndex', value: String(filterSelected.pageIndex) },
      { key: 'limit', value: String(filterSelected.pageSize) },
      { key: 'searchTerm', value: String(filterSelected.searchTerm ?? '') },
    ];

    const response = await exportPdf(queryParams);
    if (response) {
      const fileBlob = response as any;
      const href = URL.createObjectURL(new Blob([fileBlob]));
      const element = document.createElement('a');
      element.href = href;
      element.setAttribute('download', `Userlist_${dayjs().format(FormatTime.Date)}.csv`);
      document.body.appendChild(element);
      element.click();
    }
  };

  const getList = useCallback(async () => {
    setLoading(true);
    const queryParams = [
      { key: 'pageIndex', value: String(filterSelected.pageIndex) },
      { key: 'limit', value: String(filterSelected.pageSize) },
      { key: 'searchTerm', value: String(filterSelected.searchTerm ?? '') },
    ];
    const response = await getUserList(queryParams);
    if (response) {
      const { paging } = response;
      const paginationResponse = {
        current: paging.pageIndex,
        pageSize: filterSelected.pageSize,
      };
      setTableParams({
        ...tableParams,
        pagination: {
          ...paginationResponse,
          total: paging.totalPages,
        },
      });
      const dataRewrite = response.data?.map((item) => {
        const newObj = { ...item, key: item.id };
        return newObj;
      });
      setDataTable(dataRewrite);
    }
    setLoading(false);
  }, [filterSelected, tableParams]);

  const handleEdit = (record: IUserList) => {
    toggleDialogUser();
    setRecordEdited(record);
  };

  const handleCreate = () => {
    toggleDialogUser();
    setRecordEdited({} as IUserList);
  };

  const handleDelete = (record: IUserList) => {
    showModalConfirm({
      record,
      title: `${t('confirmDeletion')}`,
      content: `${t('doYouWantToDeleteTheRecord')}`,
      t,
      onOk: () => {
        deleteUser({ id: record.id });
        getList();
      },
    });
  };

  const columns: ColumnsType<any> = [
    {
      title: () => (
        <div>
          <span>{t('user.userName')}</span>
        </div>
      ),
      render: (record: any) => {
        return <div>{record.userName}</div>;
      },
    },
    {
      title: () => (
        <div>
          <span>{t('user.fullName')}</span>
        </div>
      ),
      render: (record: any) => {
        return <div>{record.fullName}</div>;
      },
    },
    {
      title: t('user.email'),
      render: (record: any) => (
        <span className="text-title" style={{ marginLeft: 5 }}>
          {record.email}
        </span>
      ),
    },
    {
      title: t('user.phoneNumber'),
      render: (record: any) => <>{record.phoneNumber}</>,
    },
    {
      title: t(`user.superAdmin`),
      render: (record: any) => <>{record?.isSuperAdmin}</>,
    },
    {
      title: t('action'),
      align: 'center',
      render: (_, record: IUserList) => {
        return (
          <div
            className="table-action-wrapper"
            style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
          >
            <EditIcon className="table-action-item" onClick={() => handleEdit(record)} />
            <DeleteFilled className="table-action-item" onClick={() => handleDelete(record)} />
          </div>
        );
      },
    },
  ];

  const handleItemFilter = useCallback(
    (arr: { value?: string; key?: string }[]) => {
      if (arr.length) {
        const newObj = {
          ...filterSelected,
          pageSize: InitPagination.DEFAULT_PAGE_SIZE,
          current: InitPagination.DEFAULT_PAGE,
        } as any;
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          if (element.key) {
            newObj[element.key] = element.value;
          }
        }
        handleStringify(newObj, history);
        setFilterSelected(newObj);
        setTableParams({
          pagination: {
            current: InitPagination.DEFAULT_PAGE,
            pageSize: InitPagination.DEFAULT_PAGE_SIZE,
          },
        });
      } else {
        handleStringify(filterSelected, history);
      }
    },
    [filterSelected, history],
  );

  const onChangeSearch = (e: any) => {
    if (!e.target.value) {
      handleItemFilter([{ value: e.target.value, key: 'searchTerm' }]);
    }
    setValueSearch(e.target.value);
  };

  const onChangePage = (_pagination: TablePaginationConfig, _filters: any, sorter: any) => {
    const { current } = _pagination;
    const newObj = {
      ...filterSelected,
      pageIndex: current,
      orderByDesc: sorter,
    };
    handleStringify(newObj, history);
    setFilterSelected(newObj);
  };

  return (
    <div className="main-page-index">
      {dialogUser && (
        <DialogUser
          openDialog={dialogUser}
          action={() => {
            toggleDialogUser();
            getList();
          }}
          close={() => {
            toggleDialogUser();
          }}
          selectedRecord={recordEdited}
        />
      )}
      <PageTitle pageTitle={t('user.userList')}>
        <Button type="primary" size="large" onClick={handleCreate}>
          {t('createNew')}
        </Button>
      </PageTitle>
      <div className="main-page-index__box-filter">
        <div className="main-page-index__box-filter__left">
          <Input
            allowClear
            placeholder={t('searchByEmail') || ''}
            onPressEnter={(e: any) => handleItemFilter([{ value: e.target.value, key: 'searchTerm' }])}
            prefix={<SearchIcon />}
            className="titan-input--search"
            onChange={onChangeSearch}
            value={valueSearch ?? ''}
            size="large"
            style={{ minWidth: 300 }}
          />
        </div>
        <div className="main-page-index__box-filter__right">
          <ButtonExport action={handleExportExcel} label={t('exportExcel')} />
          <ButtonExport action={handleExportPdf} label={t('exportPdf')} />
        </div>
      </div>

      <div className="main-page-index__content" style={{ marginTop: 20 }}>
        <Table
          columns={columns}
          dataSource={dataTable}
          loading={loading}
          scroll={{ y: 390, x: '100%' }}
          onChange={onChangePage}
          pagination={{
            defaultPageSize: InitPagination.DEFAULT_PAGE_SIZE,
            defaultCurrent: 1,
            total: tableParams.pagination?.total,
            current: tableParams.pagination?.current,
            pageSize: tableParams.pagination?.pageSize || InitPagination.DEFAULT_PAGE_SIZE,
          }}
        />
      </div>
    </div>
  );
};

export default UserList;
