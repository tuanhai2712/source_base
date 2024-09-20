/* eslint-disable import/no-extraneous-dependencies */
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Row, Table } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import weekday from 'dayjs/plugin/weekday';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';

import { convertLocaleTimeToUtcTime, convertUtcToLocalTime, handleStringify } from '@/utils';
import { useTranslation } from 'react-i18next';
import { DATE_FORMAT, InitPagination } from '@/constants';
import { useHistory } from 'react-router-dom';
import { getSystemLogList, ISystemLog } from '@/services/log-management/system-log';
import { TableParams } from '@/pages/system-management/user-list/interface';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const { RangePicker } = DatePicker;
export const SystemLog: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const history = useHistory();
  const parsedQuery = queryString.parse(history.location.search);
  const { pageSize, pageIndex, searchTerm } = parsedQuery;
  const [dataTable, setDataTable] = useState<ISystemLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<ISystemLog>({} as ISystemLog);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: pageIndex ? Number(pageIndex) : InitPagination.DEFAULT_PAGE,
      pageSize: pageSize ? Number(pageSize) : InitPagination.DEFAULT_PAGE_SIZE,
    },
  });

  const initialValues = {
    searchTerm: '',
    pageSize: pageSize ? Number(pageSize) : InitPagination.DEFAULT_PAGE_SIZE,
    pageIndex: pageIndex ? Number(pageIndex) : InitPagination.DEFAULT_PAGE,
    fromDate: dayjs().startOf('month').startOf('day'),
    toDate: dayjs().endOf('month').endOf('day'),
    timeRange: [dayjs().startOf('month').startOf('day'), dayjs().endOf('month').endOf('day')],
  };

  const [filterConditions, setFilterConditions] = useState<any>(initialValues);

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filterConditions)]);

  const columns: ColumnsType<any> = [
    {
      title: t('no.'),
      dataIndex: 'index',
      key: 'index',
      width: 50,
      render: (text, record, index) => {
        return (filterConditions.pageIndex - 1) * filterConditions.pageSize + index + 1;
      },
    },
    {
      title: t('time'),
      dataIndex: 'timeStamp',
      key: 'timeStamp',
      width: 100,
      sorter: true,
      render: (text) => {
        return convertUtcToLocalTime(text, DATE_FORMAT.FULL_COMPLETE_TIMESTAMP_SECONDS);
      },
    },
    {
      title: t('log.path'),
      dataIndex: 'path',
      key: 'path',
      width: 200,
      sorter: true,
    },
    {
      title: t('log.requestBody'),
      dataIndex: 'requestBody',
      key: 'requestBody',
      width: 200,
      sorter: true,
    },
    {
      title: t('log.token'),
      dataIndex: 'userAgent',
      key: 'userAgent',
      width: 200,
      sorter: true,
    },
    {
      title: t('log.userName'),
      dataIndex: 'userName',
      key: 'userName',
      width: 100,
      sorter: true,
    },
    {
      title: t('log.message'),
      dataIndex: 'message',
      key: 'message',
      width: 200,
      sorter: true,
    },
    {
      title: t('log.exception'),
      dataIndex: 'exception',
      key: 'exception',
      sorter: true,
    },
  ];

  const getList = useCallback(async () => {
    setLoading(true);
    const queryParams = [
      { key: 'pageIndex', value: String(filterConditions.pageIndex) },
      { key: 'pageSize', value: String(filterConditions.pageSize) },
      { key: 'searchTerm', value: String(filterConditions.searchTerm ?? '') },
      { key: 'fromDate', value: String(convertLocaleTimeToUtcTime(filterConditions?.fromDate) ?? '') },
      { key: 'toDate', value: String(convertLocaleTimeToUtcTime(filterConditions?.toDate) ?? '') },
    ];

    const response = await getSystemLogList(queryParams);
    if (response && response.statusCode === 200) {
      const { paging } = response;
      const paginationResponse = {
        current: paging.pageIndex,
        pageSize: filterConditions.pageSize,
      };
      setTableParams({
        ...tableParams,
        pagination: {
          ...paginationResponse,
          total: paging.totalCount,
        },
      });

      const dataRewrite = response.data?.map((item) => {
        const newObj = { ...item, key: item.id };
        return newObj;
      });
      setDataTable(dataRewrite);
    }
    setLoading(false);
  }, [filterConditions, tableParams]);

  const onCancelDetail = () => {
    setIsOpenDetail(false);
    setSelectedRecord({} as ISystemLog);
  };

  const onChangePage = (_pagination: TablePaginationConfig, _filters: any, sorter: any) => {
    const { current } = _pagination;
    const newObj = {
      ...filterConditions,
      pageIndex: current,
      orderByDesc: sorter,
    };
    handleStringify(newObj, history);
    setFilterConditions(newObj);
  };

  const handleSearch = (value: any) => {
    const newObj = {
      ...filterConditions,
      pageIndex: 1,
      searchTerm: value.searchTerm ? String(value.searchTerm) : '',
      fromDate: value.timeRange[0],
      toDate: value.timeRange[1],
    };
    handleStringify(newObj, history);
    setFilterConditions(newObj);
  };

  const handleClearSearch = () => {
    const newObj = {
      ...filterConditions,
      pageIndex: 1,
      searchTerm: '',
      fromDate: dayjs().startOf('month').startOf('day'),
      toDate: dayjs().endOf('month').endOf('day'),
    };
    form.resetFields();
    handleStringify(newObj, history);
    setFilterConditions(newObj);
  };

  return (
    <>
      <div style={{ display: isOpenDetail ? 'none' : 'block' }}>
        <Form form={form} initialValues={initialValues} onFinish={handleSearch}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="searchTerm" label={t('log.userName')}>
                <Input prefix={<SearchOutlined />} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="timeRange" label={t('day')}>
                <RangePicker showTime className="w-full" format={DATE_FORMAT.FULL_DATE_TIME} />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" size="large">
            {t('search')}
          </Button>
          <Button size="large" onClick={handleClearSearch}>
            {t('clear')}
          </Button>
        </Form>
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
            onRow={(record: ISystemLog) => {
              return {
                onDoubleClick: () => {
                  setIsOpenDetail(true);
                  setSelectedRecord(record);
                },
              };
            }}
          />
        </div>
      </div>

      <div style={{ display: !isOpenDetail ? 'none' : 'block' }}>
        <div className="modal-header h-[48px] text-[#ffffff] bg-main items-center flex justify-between px-[15px] text-[16px]">
          {t('log.requestDetails')}
          <CloseOutlined onClick={onCancelDetail} />
        </div>
        <Row>
          <Col span={12}>
            <div>
              <label>{t('time')}: </label>
              <strong>
                {convertUtcToLocalTime(selectedRecord.timeStamp || '', DATE_FORMAT.FULL_COMPLETE_TIMESTAMP_SECONDS)}
              </strong>
            </div>
            <div>
              <label>API URL: </label>
              <strong>{selectedRecord.path}</strong>
            </div>
            <div>
              <label>Payload: </label>
              <strong>{selectedRecord.requestBody}</strong>
            </div>
            <div>
              <label>Token: </label>
              <strong>{selectedRecord.userAgent}</strong>
            </div>
            <div>
              <label>{t('log.userName')}: </label>
              <strong>{selectedRecord.userName}</strong>
            </div>
          </Col>
          <Col span={12}>
            <label>{t('log.exception')}: </label>
            <strong>{selectedRecord.exception}</strong>
          </Col>
        </Row>
      </div>
    </>
  );
};
