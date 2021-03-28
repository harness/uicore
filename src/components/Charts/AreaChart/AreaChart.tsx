import React from 'react'

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

import css from './AreaChart.css'

export interface AreaChartProps {}

export const AreaChart: React.FC<AreaChartProps> = _props => {
  const options = {
    title: {
      text: 'My chart'
    },
    series: [
      {
        data: [1, 2, 3]
      }
    ]
  }
  return (
    <div className={css.main}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}
