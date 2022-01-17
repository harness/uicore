/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { SparkChart, Color } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { SparkChartProps } from './SparkChart'

export default {
  title: 'Charts /  SparkChart',

  component: SparkChart,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title> SparkChart</Title>

            <Subtitle>
              <pre>
                <code>{`import {  SparkChart }  from '@harness/uicore'`}</code>
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

export const SparkChartComp: Story<SparkChartProps> = args => <SparkChart {...args} />

export const SparkChartComp2: Story<SparkChartProps> = args => <SparkChart {...args} />

SparkChartComp.args = {
  data: [10, 2, 5, 0, 7, 8, 9],
  color: Color.BLACK,
  emptyHeight: '5px'
}

SparkChartComp2.args = {
  data: [10, 2, 5, 0, 7, 8, 9],
  color: Color.BLACK,
  emptyHeight: '5px',
  data2: [1, 0, 2, 0, 7, 1, 0],
  color2: Color.RED_500
}
