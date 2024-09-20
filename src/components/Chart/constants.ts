import dayjs from 'dayjs';

export const optionsChartPNL: any = {
  chart: {
    toolbar: {
      show: false,
    },
    fontFamily: 'Roboto',
    name: 'chartPNL',
    zoom: {
      enabled: false,
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },

  legend: {
    show: false,
  },

  xaxis: {
    type: 'category',
    tickPlacement: 'on',
    categories: [],
    labels: {
      formatter: (value: any) => {
        return dayjs(value).format('DD/MM');
      },
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    tickAmount: 5,
    forceNiceScale: true,
    axisBorder: {
      show: false,
      color: '#333333',
      offsetX: -2,
    },
  },

  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 1,
      opacityFrom: 0.8,
      opacityTo: 0.2,
      gradientToColors: ['#000000'],
    },
  },
};
