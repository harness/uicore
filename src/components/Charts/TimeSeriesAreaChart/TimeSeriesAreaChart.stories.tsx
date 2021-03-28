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
                <code>{`import { TimeSeriesAreaChart } from '@wings-software/uicore'`}</code>
              </pre>
            </Subtitle>
            This component in a wrapper around <a>https://www.highcharts.com/demo/area-basic</a>, with the following two
            defaults:
            <ol>
              <li>
                x-axis fixed to last <i>N</i> days of duration
              </li>
              <li>y-axis fixed to count of entity under consideration, e.g. deployments, verifications etc.</li>
            </ol>
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
