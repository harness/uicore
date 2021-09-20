import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { RadioButton, RadioButtonProps } from './RadioButton'

export default {
  title: 'Components / RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>RadioButton</Title>
            <Subtitle>
              <pre>
                <code>{`import { RadioButton } from '@wings-software/uicore'`}</code>
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

export const Basic: Story<RadioButtonProps> = args => {
  return (
    <>
      <RadioButton label="Not Selected" value="one" {...args} />
      <RadioButton label="Selected" value="one" checked {...args} />
      <RadioButton label="Disabled" disabled value="one" {...args} />
      <RadioButton label="Disabled and Selected" disabled checked value="one" {...args} />
    </>
  )
}

export const ActiveState: Story<RadioButtonProps> = args => {
  return (
    <>
      <RadioButton label="Not Selected" value="one" {...args} />
      <RadioButton label="Selected" value="one" checked {...args} />
    </>
  )
}

export const DisabledState: Story<RadioButtonProps> = args => {
  return (
    <>
      <RadioButton label="Disabled" disabled value="one" {...args} />
      <RadioButton label="Disabled and Selected" disabled checked value="one" {...args} />
    </>
  )
}

export const WithElementAsLabel: Story<RadioButtonProps> = args => {
  return (
    <>
      <RadioButton
        label={
          <span>
            <strong>Bold text</strong> and <em>italic text</em>
          </span>
        }
        {...args}
      />
      <RadioButton label={<span style={{ transform: 'rotate(180deg)' }}>Upside-down text</span>} {...args} />
    </>
  )
}
