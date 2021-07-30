import React, { FormEvent, useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Radio } from './Radio'
import { RadioGroup, RadioGroupProps } from './RadioGroup'
import { action } from '@storybook/addon-actions'

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
                <code>{`import { RadioGroup } from '@wings-software/uicore'`}</code>
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

export const Basic: Story<RadioGroupProps> = () => {
  const [currentOption, setCurrentOption] = useState<string>('one')

  return (
    <RadioGroup
      label="Section Headline"
      selectedValue={currentOption}
      onChange={(e: FormEvent<HTMLInputElement>) => {
        action('changed')(e) // storybook action
        setCurrentOption(e.currentTarget.value)
      }}
      options={[
        { label: 'Option 1', value: 'one' },
        { label: 'Option 2', value: 'two' },
        { label: 'Option 3', value: 'three' },
        { label: 'Option 4 (disabled)', value: 'four', disabled: true }
      ]}
    />
  )
}
