import React, { useCallback, useEffect, useState } from 'react';

import { InfoCircleIcon } from '@/assets';
import ChartColumn from '@/components/Chart/ChartColumn';
import { TransactionType } from '@/constants';
import { IDataChart } from '@/services/common.services';
import { formatNumber } from '@/utils';
import { Spin, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import TimeFilter from '../components/TimeFilter';
import sampleData from './data.json';
interface IProps {
  title: string;
  type: 'titan' | 'user';
}

export const Deposit: React.FC<IProps> = ({ title, type }) => {
  const { t } = useTranslation();
  const [loadingDataChart, setLoadingDataChart] = useState(true);
  const [dataChart, setDataChart] = useState<IDataChart[]>(sampleData);
  const [filterDate, setFilterDate] = useState<any>({
    startTime: '',
    endTime: '',
  });

  const getDataChart = async () => {
    setLoadingDataChart(true);
    const queryParams = [
      { key: 'startTime', value: String(filterDate.startTime) },
      { key: 'endTime', value: String(filterDate.endTime) },
      { key: 'type', value: TransactionType.DEPOSIT },
    ];
    let response;

    // if (response && response.success) {
    //   setDataChart(response.data);
    // }
    setLoadingDataChart(false);
  };
  useEffect(() => {
    getDataChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filterDate)]);

  const handleItemFilter = useCallback(
    (arr: { value?: string; key?: string }[]) => {
      if (arr.length) {
        const newObj = {
          ...filterDate,
        } as any;
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          if (element.key) {
            newObj[element.key] = element.value;
          }
        }
        setFilterDate(newObj);
      } else {
      }
    },
    [filterDate],
  );

  const renderTotal = useCallback(() => {
    if (loadingDataChart) {
      return <Spin />;
    }
    if (dataChart.length) {
      let sum = 0;
      dataChart.map((i: IDataChart) => (sum += i.value));
      return `$ ${formatNumber(sum)}`;
    }
    return '-';
  }, [dataChart, loadingDataChart]);

  return (
    <div className="card-item__chart" style={{ marginTop: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
        <div>
          <div className="card-item__chart-title">
            {title}

            <Tooltip
              title={
                type === 'user'
                  ? t('Number of tokens were deposited into the system by users')
                  : t('Number of tokens were deposited into the hot wallet of system')
              }
            >
              <InfoCircleIcon />
            </Tooltip>
          </div>
          <div className="card-item__chart-total-text">{renderTotal()}</div>
        </div>

        <TimeFilter filterSelected={filterDate} action={handleItemFilter} />
      </div>
      <ChartColumn dataChart={loadingDataChart ? [] : dataChart} />
    </div>
  );
};

export default Deposit;
