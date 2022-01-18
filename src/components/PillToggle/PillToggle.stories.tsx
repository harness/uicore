/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

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
  ],
  selectedView: 'label-1'
}
