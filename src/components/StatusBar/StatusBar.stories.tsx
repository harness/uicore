/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Color, Container, StatusBar, StatusBarProps } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'

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
      <StatusBar background={Color.GREEN_500} {...args} />
      <StatusBar gradient="linear-gradient(to right, var(--yellow-500), var(--red-500))" {...args} />
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
