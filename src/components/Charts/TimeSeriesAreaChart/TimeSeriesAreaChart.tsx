import React from 'react'

import HighchartsReact from 'highcharts-react-official'
import Highcharts, { SeriesAreaOptions } from 'highcharts'

import css from './TimeSeriesAreaChart.css'

export interface TimeSeriesAreaChartProps {
  seriesData?: SeriesAreaOptions['data']
}

export const TimeSeriesAreaChart: React.FC<TimeSeriesAreaChartProps> = ({ seriesData = [] }) => {
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
      pointFormat: '<b>{series.name}&nbsp;:&nbsp;{point.y}</b><br/>{Highcharts.dateFormat("%e %b, %H:%M", point.x)}'
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        connectNulls: true,
        fillOpacity: 0.85,
        lineWidth: 1,
        point: {
          events: {
            // TODO integrate this later if on-click behaviour is needed
            click: () => {}
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
