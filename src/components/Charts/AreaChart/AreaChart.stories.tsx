import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { AreaChart, AreaChartProps } from './AreaChart'

export default {
  title: 'Components / Charts / AreaChart',
  component: AreaChart
} as Meta

export const AreaChartComp: Story<AreaChartProps> = args => <AreaChart {...args} />

AreaChartComp.args = {}
