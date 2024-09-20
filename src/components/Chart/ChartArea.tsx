import React from 'react';

import dayjs from 'dayjs';
import Chart from 'react-apexcharts';
import { optionsChartPNL } from './constants';
interface IDataStatisticChart {
  time: number;
  value: number;
}

interface IChart {
  dataChart: IDataStatisticChart[];
  height?: number;
  showAxis?: boolean;
  YUnit?: string;
}

export const ChartArea: React.FC<IChart> = ({ dataChart, height = 250, showAxis = true, YUnit }) => {
  const isAllZero = dataChart?.map((item) => item.value).every((item: number) => item === 0);

  const handleGetOptionChart = (optionChart: any, data: any) => {
    const category = data?.map((item: IDataStatisticChart) => dayjs(new Date(item.time * 1000), 'YYYY/MM/DD'));
    const valueChart = dataChart?.map((item: IDataStatisticChart) => Number(item.value.toFixed(2)));
    const minChart = Math.min(...valueChart);
    const labelXxis = showAxis ? {} : { labels: { show: false } };
    const labelYxis = showAxis
      ? {
          labels: {
            formatter: (value: any) => {
              return `${parseFloat(value.toFixed(2))}${YUnit ?? ''}`;
            },
          },
        }
      : { labels: { show: false } };

    return {
      ...optionChart,

      xaxis: {
        ...optionChart.xaxis,
        ...labelXxis,
        categories: category,
        tickAmount: valueChart?.length > 15 ? 10 : valueChart?.length,
      },
      yaxis: {
        ...optionChart.yaxis,
        ...labelYxis,
        min: Number(minChart),
        forceNiceScale: true,
      },

      tooltip: {
        enabled: isAllZero ? false : true,
        x: {
          enabled: true,
          formatter: (valueX: number, b: any) => {
            return `${dayjs(category[valueX]).format('DD/MM')}`;
          },
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (valueY: string) => '',
          },
        },

        marker: {
          show: false,
        },
      },
      fill: {
        gradient: {
          ...optionChart.fill.gradient,
          opacityFrom: isAllZero ? 0.5 : 0.8,
        },
      },
      colors: !isAllZero ? ['#A586FE'] : ['#808080'],
    };
  };

  return (
    <Chart
      options={handleGetOptionChart(optionsChartPNL, dataChart)}
      series={[
        {
          name: 'dataChart',
          data: isAllZero ? [] : dataChart?.map((item) => Number(item.value.toFixed(2))),
        },
      ]}
      type="area"
      height={`${height}px`}
      className={`main-chart-area ${showAxis ? '' : 'hide-grid'}`}
    />
  );
};

export default ChartArea;
