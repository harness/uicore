/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Color } from '@harness/design-system'

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
