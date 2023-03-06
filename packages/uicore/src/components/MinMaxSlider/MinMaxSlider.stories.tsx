/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { MinMaxSlider } from '../..'
import { MultiRangeSliderProps } from './MinMaxSlider'

export default {
  title: 'Components/MinMaxSlider',

  component: MinMaxSlider,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>MinMaxSlider</Title>
            <Subtitle>
              <pre>
                <code>{`import { MinMaxSlider } from '@harness/uicore'`}</code>
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

export const Basic: Story<MultiRangeSliderProps> = args => {
  const { max, min, onChange, step, debounceDuration, width, unitSuffixString } = args
  return (
    <MinMaxSlider
      max={max}
      min={min}
      onChange={onChange}
      step={step}
      debounceDuration={debounceDuration}
      width={width}
      unitSuffixString={unitSuffixString}
    />
  )
}

Basic.args = {
  max: 100,
  min: 0,
  step: 1,
  unitSuffixString: 'ms',
  width: '400px'
}
Basic.argTypes = {
  onChange: { action: 'Value changed' }
}
