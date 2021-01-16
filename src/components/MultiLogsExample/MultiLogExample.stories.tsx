import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { MultiLogsExample } from './MultiLogsExample'

export default {
  title: 'Components / MultiLogsExample',
  component: MultiLogsExample,
  parameters: {
    controls: {
      disabled: true
    },
    actions: {
      disabled: true
    }
  }
} as Meta

export const Basic: Story<void> = _args => <MultiLogsExample />
