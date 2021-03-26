import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Color } from '../../core/Color'

import { WeightedStack, WeightedStackProps } from './WeightedStack'

export default {
  title: 'Components / WeightedStack'
} as Meta

export const WeightedStackComp: Story<WeightedStackProps> = args => <WeightedStack {...args} />

WeightedStackComp.args = {
  data: [
    { label: 'Non Prod', value: 12, color: Color.BLUE_450 },
    { label: 'Prod', value: 2, color: Color.BLUE_700 }
  ]
}
