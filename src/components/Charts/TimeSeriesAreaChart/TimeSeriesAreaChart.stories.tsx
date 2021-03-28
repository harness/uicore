import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'

import { AreaChart, AreaChartProps } from './TimeSeriesAreaChart'

import deploymentData from './mocks/deployments.json'

export default {
  title: 'Components / Charts / AreaChart',
  component: AreaChart,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Time Series Area Chart</Title>
            <Subtitle>
              <pre>
                <code>{`import {WeightedStack} from '@wings-software/uicore'`}</code>
              </pre>
            </Subtitle>
            This component in a wrapper around https://www.highcharts.com/demo/area-basic.
            <pre>
              <code>
                w<sub>i</sub> = x<sub>i</sub> / ∑ x<sub>i</sub>&nbsp;where x<sub>0</sub>, x<sub>1</sub>, x<sub>2</sub>
                ... are weights(or values) of bars
              </code>
            </pre>
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />
            <Stories />
          </>
        )
      }
    }
  }
} as Meta

export const AreaChartComp: Story<AreaChartProps> = args => <AreaChart {...args} />

AreaChartComp.args = {
  seriesData: deploymentData
}
