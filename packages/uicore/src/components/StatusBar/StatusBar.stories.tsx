/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Container, StatusBar, StatusBarProps } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Color } from '@harnessio/design-system'

export default {
  title: 'Charts / StatusBar',

  component: StatusBar,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>StatusBar</Title>

            <Subtitle>
              <pre>
                <code>{`import { StatusBar }  from '@harness/uicore'`}</code>
              </pre>
            </Subtitle>
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />

            <Stories />
          </>
        )
      }
    }
  },
  decorators: [Story => <Story />]
} as Meta
export const HorizontalBars: Story<StatusBarProps> = args => {
  return (
    <>
      <StatusBar label="In Progress" background={Color.BLUE_500} height={15} width={150} />
      <StatusBar {...args} background={Color.GREEN_500} />
      <StatusBar {...args} gradient="linear-gradient(to right, var(--yellow-500), var(--red-500))" />
    </>
  )
}
HorizontalBars.args = {
  height: 15,
  width: 100
}
export const VerticalBars: Story<StatusBarProps> = args => {
  return (
    <>
      <Container flex style={{ justifyContent: 'flex-start', alignItems: 'baseline' }}>
        <StatusBar background={Color.RED_500} height={15} width={150} />
        <StatusBar background={Color.GREEN_500} {...args} />
        <StatusBar gradient="linear-gradient(var(--blue-500), var(--green-500))" {...args} />
      </Container>
    </>
  )
}
VerticalBars.args = {
  height: 15,
  width: 100
}
