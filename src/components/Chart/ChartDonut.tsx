import { Empty } from 'antd';
import React from 'react';

import Chart from 'react-apexcharts';

export const ChartDonut: React.FC<any> = ({ dataChart, height = 200, options }) => {
  const sum = dataChart.reduce((accumulator: number, value: number) => {
    return accumulator + value;
  }, 0);
  if (sum === 0) {
    return (
      <div style={{ margin: '20px 0px' }}>
        <Empty />
      </div>
    );
  }
  return (
    <Chart options={options} series={dataChart} type="donut" height={`${height}px`} className={`main-chart-donut`} />
  );
};

export default ChartDonut;
