import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { ExpandingSearchInput, PropsInterface } from './ExpandingSearchInput'

export default {
  title: 'Components/ExpandingSearchInput',
  component: ExpandingSearchInput
} as Meta

export const Basic: Story<PropsInterface> = args => <ExpandingSearchInput {...args} />

Basic.args = {}
