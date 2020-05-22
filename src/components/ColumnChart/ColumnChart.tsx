import React from 'react'
import Highcharts, { Options } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface Props {
  width?: string
  height?: string
  options?: Options
}

function ColumnChart(props: Props) {
  const options = {
    chart: {
      type: 'column',
      width: props.width!,
      height: props.height!
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
  return <HighchartsReact highcharts={Highcharts} options={props.options! || options} />
}

export { ColumnChart }
