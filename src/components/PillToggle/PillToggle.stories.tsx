import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { PillToggle, PillToggleProps } from './PillToggle'

export default {
  title: 'Components / PillToggle',

  component: PillToggle
} as Meta

export const Basic: Story<PillToggleProps<string>> = args => <PillToggle {...args} />

Basic.args = {
  options: [
    { label: 'Label 1', value: 'label-1' },
    { label: 'Label 2', value: 'label-2' }
  ]
}
