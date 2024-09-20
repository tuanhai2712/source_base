import React, { useCallback, useEffect, useState } from 'react';

import { EditIcon, SearchIcon } from '@/assets';
import PageTitle from '@/components/PageTitle';
import { InitPagination } from '@/constants';
import { useToggleValue } from '@/hooks';
import { handleStringify } from '@/utils';
import { Button, Input, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import DialogRole from './DialogRole';
import { IFilter, TableParams } from './interface';
import { deleteRole, getRoleList, IRoleList } from '@/services/system-management/role-list';
import { DeleteFilled } from '@ant-design/icons';
import showModalConfirm from '@/utils/show-modal-confirm';

export const RoleList: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const parsedQuery = queryString.parse(history.location.search);
  const { pageSize, pageIndex, searchTerm } = parsedQuery;
  const [dataTable, setDataTable] = useState<IRoleList[]>([]);
  const [valueSearch, setValueSearch] = useState<string>(searchTerm ? String(searchTerm) : '');
  const [loading, setLoading] = useState(false);
  const [dialogRole, toggleDialogRole] = useToggleValue(false);
  const [recordEdited, setRecordEdited] = useState({} as IRoleList);
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

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filterSelected)]);

  const getList = useCallback(async () => {
    setLoading(true);
    const queryParams = [
      { key: 'pageIndex', value: String(filterSelected.pageIndex) },
      { key: 'pageSize', value: String(filterSelected.pageSize) },
      { key: 'searchTerm', value: String(filterSelected.searchTerm ?? '') },
    ];
    const response = await getRoleList(queryParams);
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

  const handleCreate = () => {
    toggleDialogRole();
  };

  const handleEdit = (record: IRoleList) => {
    toggleDialogRole();
    setRecordEdited(record);
  };

  const handleDelete = (record: IRoleList) => {
    showModalConfirm({
      record,
      title: `${t('confirmDeletion')}`,
      content: `${t('doYouWantToDeleteTheRecord')}`,
      t,
      onOk: () => {
        deleteRole({ id: record.id });
        getList();
      },
    });
  };

  const columns: ColumnsType<any> = [
    {
      title: () => (
        <div>
          <span>{t('role.nameROle')}</span>
        </div>
      ),
      render: (record: any) => {
        return <div>{record.name}</div>;
      },
    },
    {
      title: () => (
        <div>
          <span>{t('role.description')}</span>
        </div>
      ),
      render: (record: any) => {
        return <div>{record.description}</div>;
      },
    },
    {
      title: t('action'),
      align: 'center',
      render: (_, record: IRoleList) => {
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
      {dialogRole && (
        <DialogRole
          openDialog={dialogRole}
          selectedRecord={recordEdited}
          action={() => {
            toggleDialogRole();
            getList();
          }}
          close={() => {
            toggleDialogRole();
          }}
        />
      )}

      <PageTitle pageTitle={t('role.roleList')}>
        <Button type="primary" size="large" onClick={handleCreate}>
          {t('createNew')}
        </Button>
      </PageTitle>
      <div className="main-page-index__box-filter">
        <div className="main-page-index__box-filter__left">
          <Input
            allowClear
            placeholder={t('role.searchByName') || ''}
            onPressEnter={(e: any) => handleItemFilter([{ value: e.target.value, key: 'searchTerm' }])}
            prefix={<SearchIcon />}
            className="titan-input--search"
            onChange={onChangeSearch}
            value={valueSearch ?? ''}
            size="large"
            style={{ minWidth: 300 }}
          />
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

export default RoleList;
