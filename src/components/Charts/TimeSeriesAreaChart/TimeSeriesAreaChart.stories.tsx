import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'

import { TimeSeriesAreaChart, TimeSeriesAreaChartProps } from './TimeSeriesAreaChart'

import deploymentData from './mocks/deployments.json'

export default {
  title: 'Components / Charts / TimeSeriesAreaChart',
  component: TimeSeriesAreaChart,
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
                <code>{`import {TimeSeriesAreaChart} from '@wings-software/uicore'`}</code>
              </pre>
            </Subtitle>
            This component in a wrapper around https://www.highcharts.com/demo/area-basic.
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />
            <Stories />
          </>
        )
      }
    }
  }
} as Meta

export const TimeSeriesAreaChartComp: Story<TimeSeriesAreaChartProps> = args => <TimeSeriesAreaChart {...args} />

TimeSeriesAreaChartComp.args = {
  seriesData: deploymentData
}
