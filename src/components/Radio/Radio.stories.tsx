import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Radio, RadioProps } from './Radio'

export default {
  title: 'Components / Radio',

  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Radio</Title>
            <Subtitle>
              <pre>
                <code>{`import {Radio} from '@wings-software/uicore'`}</code>
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
  argTypes: { onChange: { action: 'changed' } }
} as Meta

export const Basic: Story<RadioProps> = args => {
  return (
    <>
      <Radio label="Not Selected" value="one" {...args} />
      <Radio label="Selected" value="one" checked {...args} />
      <Radio label="Disabled" disabled value="one" {...args} />
      <Radio label="Disabled and Selected" disabled checked value="one" {...args} />
    </>
  )
}

export const ActiveState: Story<RadioProps> = args => {
  return (
    <>
      <Radio label="Not Selected" value="one" {...args} />
      <Radio label="Selected" value="one" checked {...args} />
    </>
  )
}

export const DisabledState: Story<RadioProps> = args => {
  return (
    <>
      <Radio label="Disabled" disabled value="one" {...args} />
      <Radio label="Disabled and Selected" disabled checked value="one" {...args} />
    </>
  )
}
