export const timeSeriesChartDefaultConfig = {
  chart: {
    zoomType: 'x',
    width: 400,
    height: 300
  },
  title: {
    text: ''
  },
  xAxis: {
    type: '',
    labels: {
      enabled: false
    }
  },
  yAxis: {
    title: {
      text: ''
    },
    labels: {
      enabled: false
    }
  },
  legend: {
    enabled: false
  },
  series: [
    {
      type: 'area',
      name: '',
      data: []
    }
  ],
  credits: {
    enabled: false
  }
}
