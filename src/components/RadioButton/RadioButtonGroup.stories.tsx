import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { RadioButton } from './RadioButton'
import { RadioButtonGroup, RadioButtonGroupProps } from './RadioButtonGroup'

const options = [
  { label: 'Option 1', value: 'one' },
  { label: 'Option 2', value: 'two' },
  { label: 'Option 3', value: 'three' },
  { label: 'Option 4 (disabled)', value: 'four', disabled: true }
]

export default {
  title: 'Components / RadioButtonGroup',
  component: RadioButtonGroup,
  subcomponents: { RadioButton },
  argTypes: {
    onChange: { action: 'change' },
    selectedValue: { control: false }
  },
  args: {
    label: 'Section Headline',
    options
  },
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>RadioButtonGroup</Title>
            <Subtitle>
              <pre>
                <code>{`import { RadioButtonGroup } from '@wings-software/uicore'`}</code>
              </pre>
            </Subtitle>

            <Primary />
            <ArgsTable story={PRIMARY_STORY} />

            <Stories />
          </>
        )
      }
    }
  }
} as Meta

const RadioButtonGroupTemplate: Story<RadioButtonGroupProps> = args => {
  const [currentOption, setCurrentOption] = useState<string>('one')

  return (
    <RadioButtonGroup
      {...args}
      selectedValue={currentOption}
      onChange={e => {
        args.onChange(e)
        setCurrentOption(e.currentTarget.value)
      }}
    />
  )
}

export const Basic = RadioButtonGroupTemplate.bind({})

export const Inline = RadioButtonGroupTemplate.bind({})
Inline.args = {
  inline: true
}

export const WithElementAsLabel = RadioButtonGroupTemplate.bind({})
WithElementAsLabel.args = {
  label: (
    <span>
      <strong>Bold text</strong> and <em>Italic text</em>
    </span>
  )
}

export const WithElementAsOptionLabel = RadioButtonGroupTemplate.bind({})
WithElementAsOptionLabel.args = {
  options: [...options, { label: <span style={{ transform: 'rotate(180deg)' }}>A strange option</span>, value: 'five' }]
}
