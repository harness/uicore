/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Color } from '@harnessio/design-system'

import { PillToggle, PillToggleProps } from './PillToggle'
import { Container } from '../Container/Container'
import { Layout } from '../../layouts/Layout'
import { Text } from '../Text/Text'

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
  selectedView: 'label-1',
  disableToggleReasonContent: (
    <Container padding="medium">
      <Layout.Vertical width={325} padding={{ left: 'small' }}>
        <Text width={284} color={Color.GREY_0} margin={{ bottom: 'small' }} font={{ size: 'normal', weight: 'light' }}>
          The Visual Editor is disabled because of the errors in the YAML file.
        </Text>
        <Text width={284} color={Color.GREY_0} font={{ size: 'normal', weight: 'light' }}>
          Fix all the errors indicated in the YAML Editor to enable the Visual mode.
        </Text>
      </Layout.Vertical>
    </Container>
  )
}
