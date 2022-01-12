import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { CircularPercentageChart, Color } from '../..'
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
          name: 'nav-cd',
          size: 40
        }}
        {...argsCopy}
      />
    </>
  )
}
