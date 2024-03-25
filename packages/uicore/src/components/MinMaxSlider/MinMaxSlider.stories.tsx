/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
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
                <code>{`import { MinMaxSlider } from '@harnessio/uicore'`}</code>
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
