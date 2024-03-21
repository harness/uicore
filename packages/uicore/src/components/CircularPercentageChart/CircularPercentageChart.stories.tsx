/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { CircularPercentageChart } from '../..'
import { Color } from '@harnessio/design-system'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { CircularPercentageChartProps } from '../CircularPercentageChart/CircularPercentageChart'
import { omit } from 'lodash-es'

export default {
  title: 'Charts / CircularPercentageChart',

  component: CircularPercentageChart,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>CircularPercentageChart</Title>

            <Subtitle>
              <pre>
                <code>{`import { CircularPercentageChart }  from '@harness/uicore'`}</code>
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
export const Basic: Story<CircularPercentageChartProps> = args => {
  const { size = 80, value = 80, color = Color.GREEN_500 } = args
  const argsCopy = omit(args, ['size', 'value', 'color'])
  return (
    <>
      <CircularPercentageChart size={size} value={value} color={color} {...argsCopy} />
    </>
  )
}
Basic.args = { color: Color.GREEN_500 }
export const WithIcon: Story<CircularPercentageChartProps> = args => {
  const { size = 80, value = 80, color = Color.GREEN_500 } = args
  const argsCopy = omit(args, ['size', 'value', 'color'])
  return (
    <>
      <CircularPercentageChart
        size={size}
        value={value}
        color={color}
        icon={{
          name: 'advanced',
          size: 40
        }}
        {...argsCopy}
      />
    </>
  )
}
