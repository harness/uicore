import React from 'react'

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

import css from './AreaChart.css'
import { formatDurationForHighCharts, tranformCommonKeyToString } from './Utils'

export interface AreaChartProps {
  isTimeMetric?: boolean
  seriesData?: any
}

export const AreaChart: React.FC<AreaChartProps> = ({ seriesData = [] }) => {
  const options = {
    chart: {
      type: 'area',
      spacing: [25, 25, 25, 25]
    },
    title: false,
    xAxis: {
      type: 'datetime'
    },
    credits: false,
    legend: {
      labelFormatter: function () {
        return tranformCommonKeyToString({ key: this.name })
      },
      maxHeight: 80,
      itemStyle: {
        color: 'var(--grey-500)',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 'normal',
        textOverflow: 'ellipsis'
      }
    },
    yAxis: {
      min: 0,
      gridLineWidth: 1,
      gridLineColor: 'var(--color-chart-line-color)',
      title: false,
      labels: {
        style: {
          fontSize: '12',
          color: 'var(--grey-400)'
        },
        formatter: function () {
          return this.value
        }
      },
      stackLabels: {
        enabled: false,
        style: {
          fontWeight: 'bold'
        },
        formatter: function () {
          return this.value
        }
      }
    },
    tooltip: {
      formatter: function () {
        let pointVal = Highcharts.dateFormat('%e %b, %H:%M', new Date(this.x))
        pointVal = pointVal ? pointVal.replace(', 00:00', '') : ''
        const name = tranformCommonKeyToString({ key: this.series.name })

        return '<b>' + name + ' : ' + this.y + '</b><br/>' + pointVal
      }
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        connectNulls: true,
        fillOpacity: 0.85,
        lineWidth: 1,
        point: {
          events: {
            click: function () {}
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
