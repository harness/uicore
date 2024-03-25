/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { VisualYamlToggle, VisualYamlToggleProps, VisualYamlSelectedView } from './VisualYamlToggle'

export default {
  title: 'Components / VisualYamlToggle',
  component: VisualYamlToggle
} as Meta

export const Basic: Story<VisualYamlToggleProps> = args => <VisualYamlToggle {...args} />
Basic.args = {
  selectedView: VisualYamlSelectedView.VISUAL
}
