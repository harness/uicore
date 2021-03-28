import React from 'react'

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

import css from './AreaChart.css'

export interface AreaChartProps {
  title?: string
  yAxisTitle?: string
  seriesData?: { name: string; data: (number | null)[] }[]
}

export const AreaChart: React.FC<AreaChartProps> = ({ title = '', yAxisTitle = '', seriesData = [] }) => {
  const options = {
    chart: {
      type: 'area'
    },
    title: {
      text: title
    },
    xAxis: {
      allowDecimals: false,
      accessibility: {
        rangeDescription: 'Range: 1940 to 2017.'
      }
    },
    yAxis: {
      title: {
        text: yAxisTitle
      }
    },
    plotOptions: {
      area: {
        pointStart: 1940,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    },
    series: seriesData
  }
  return (
    <div className={css.main}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}
