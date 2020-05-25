const defaultConfig = {
  chart: {
    type: 'column',
    width: 400,
    height: 300
  },
  title: {
    text: ''
  },
  yAxis: {
    title: {
      text: ''
    }
  },
  series: [
    {
      name: '',
      data: [71.5, 106.4, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      showInLegend: false
    }
  ],
  credits: {
    enabled: false
  }
}

const getColumnChartDefaultConfig = () => {
  return defaultConfig
}

export { getColumnChartDefaultConfig }
