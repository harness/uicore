import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { SparkChart, SparkChartProps } from './SparkChart'
import { Color } from '../../core/Color'

export default {
  title: 'Components / SparkChart'
} as Meta

export const SparkChartComp: Story<SparkChartProps> = args => <SparkChart {...args} />

export const SparkChartComp2: Story<SparkChartProps> = args => <SparkChart {...args} />

SparkChartComp.args = {
  data: [10, 2, 5, 0, 7, 8, 9],
  color: Color.BLACK,
  emptyHeight: '5px'
}

SparkChartComp2.args = {
  data: [10, 2, 5, 0, 7, 8, 9],
  color: Color.BLACK,
  emptyHeight: '5px',
  data2: [1, 0, 2, 0, 7, 1, 0],
  color2: Color.RED_500
}
