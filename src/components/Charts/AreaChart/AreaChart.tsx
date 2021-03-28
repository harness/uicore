import React from 'react'

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

import css from './AreaChart.css'

export interface AreaChartProps {
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
      maxHeight: 80,
      itemStyle: {
        color: 'var(--grey-500)',
        cursor: 'pointer',
        fontSize: 'var(--font-size-small)',
        fontWeight: 'normal',
        textOverflow: 'ellipsis'
      }
    },
    yAxis: {
      min: 0,
      gridLineWidth: 1,
      gridLineColor: 'var(--grey-200)',
      title: false,
      labels: {
        style: {
          fontSize: 'var(--font-size-small)',
          color: 'var(--grey-400)'
        }
      },
      stackLabels: {
        enabled: false,
        style: {
          fontWeight: 'bold'
        }
      }
    },
    tooltip: {
      // @ts-ignore
      formatter: function () {
        // @ts-ignore
        let pointVal = Highcharts.dateFormat('%e %b, %H:%M', this.x)
        pointVal = pointVal ? pointVal.replace(', 00:00', '') : ''
        // @ts-ignore
        return '<b>' + this.series.name + ' : ' + this.y + '</b><br/>' + pointVal
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
