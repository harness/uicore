import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { WeightedStack, WeightedStackProps } from './WeightedStack'

export default {
  title: 'Components / WeightedStack'
} as Meta

export const WeightedStackComp: Story<WeightedStackProps> = args => <WeightedStack {...args} />

WeightedStackComp.args = {
  data: [12, 2]
}
