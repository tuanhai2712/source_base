import React, { useCallback, useEffect, useState } from 'react';

import ChartArea from '@/components/Chart/ChartArea';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import TimeFilter from '../components/TimeFilter';
import { IDataChart } from '@/services/common.services';
import data2 from './data2.json';

export const MemberChart: React.FC = () => {
  const { t } = useTranslation();
  const [loadingData, setLoadingData] = useState(true);

  const [dataChart, setDataChart] = useState<any[]>(data2);
  const [totalMembers, setTotalMembers] = useState<number>(0);
  const [filterDate, setFilterDate] = useState<any>({
    startTime: String(dayjs().subtract(30, 'day').unix()),
    endTime: String(dayjs().unix()),
  });

  const getDataChart = async () => {
    setLoadingData(true);
    const queryParams = [
      { key: 'startTime', value: String(filterDate.startTime) },
      { key: 'endTime', value: String(filterDate.endTime) },
    ];
    // Promise.all([await getTotalMembersChart(queryParams), await getTotalMembers(queryParams)]).then(
    //   ([dataMemberChart, dataTotalMembers]) => {
    //     if (dataMemberChart && dataMemberChart.success) {
    //       setDataChart(dataMemberChart.data);
    //     }
    //     if (dataTotalMembers && dataTotalMembers.success) {
    //       setTotalMembers(dataTotalMembers.data.totalMember);
    //     }
    //   },
    // );
    setLoadingData(false);
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
  return (
    <div className="card-item">
      <div className="card-item__title">{t('Member chart')}</div>
      <div className="card-item__chart" style={{ flex: 1, marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
          <div>
            <div className="card-item__chart-title">{t('Total number of new members')}</div>
            <div className="card-item__chart-total-text">{totalMembers}</div>
          </div>

          <TimeFilter filterSelected={filterDate} action={handleItemFilter} />
        </div>
        <ChartArea dataChart={loadingData ? [] : dataChart} />
      </div>
    </div>
  );
};

export default MemberChart;
