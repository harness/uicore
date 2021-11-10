import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { VisualYamlToggle, VisualYamlToggleProps } from './VisualYamlToggle'

export default {
  title: 'Components / VisualYamlToggle',
  component: VisualYamlToggle
} as Meta

export const Basic: Story<VisualYamlToggleProps> = args => <VisualYamlToggle {...args} />
