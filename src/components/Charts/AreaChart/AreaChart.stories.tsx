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
      data: [null, null, null, 6, 11, 32]
    },
    {
      name: 'USSR/Russia',
      data: [null, null, null, 5, 25, 50]
    }
  ]
}
