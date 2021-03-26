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
    { label: 'SSH', value: 8, color: Color.BLUE_450 },
    { label: 'Kubernetes', value: 10, color: Color.BLUE_500 },
    { label: 'Helm', value: 6, color: Color.BLUE_700 },
    { label: 'PCF', value: 3, color: Color.BLUE_900 }
  ]
}
