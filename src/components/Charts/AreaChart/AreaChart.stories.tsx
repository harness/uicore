import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { AreaChart, AreaChartProps } from './AreaChart'

export default {
  title: 'Components / Charts / AreaChart',
  component: AreaChart
} as Meta

export const AreaChartComp: Story<AreaChartProps> = args => <AreaChart {...args} />

AreaChartComp.args = {
  title: 'US and USSR nuclear stockpiles',
  yAxisTitle: 'Nuclear weapon states',
  seriesData: [
    {
      name: 'USA',
      data: [16, 11, 62, 25, 85]
    },
    {
      name: 'USSR/Russia',
      data: [5, 25, 27, 37, 46]
    }
  ]
}
