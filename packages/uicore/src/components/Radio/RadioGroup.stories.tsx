/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Radio, RadioGroup } from '../..'
import { RadioGroupProps } from '../Radio/Radio'

export default {
  title: 'Components / RadioGroup',

  component: RadioGroup,
  subcomponents: { Radio },
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>RadioGroup</Title>
            <Subtitle>
              <pre>
                <code>{`import {RadioGroup} from '@harness/uicore'`}</code>
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
export const Basic: Story<RadioGroupProps> = args => {
  return (
    <RadioGroup label="Section Headline" {...args}>
      <Radio label="Disabled" value="one" disabled />
      <Radio label="Not Selected" value="three" />
      <Radio label="Selected" value="two" defaultChecked={true} />
      <Radio label="Disabled and Selected" value="four" defaultChecked={true} disabled />
    </RadioGroup>
  )
}
