/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { RadioButton } from './RadioButton'
import { RadioButtonGroup, RadioButtonGroupProps } from './RadioButtonGroup'
import { TooltipContextProvider } from '../../frameworks/Tooltip/TooltipContext'
import { Color } from '../../core/Color'
import filterStorybookArgs from '../../utils/filterStorybookArgs'

const options: RadioButtonGroupProps['options'] = [
  { label: 'Option 1', value: 'one' },
  { label: 'Option 2', value: 'two' },
  { label: 'Option 3', value: 'three' },
  { label: 'Option 4 (disabled)', value: 'four', disabled: true }
]

const tooltips: Record<string, string> = {
  option1: 'Tooltip for option 1',
  option2: 'Tooltip for option 2',
  option3: 'Tooltip for option 3',
  option4: 'Tooltip for option 4'
}

export default {
  title: 'Components / RadioButtonGroup',
  component: RadioButtonGroup,
  subcomponents: { RadioButton },
  decorators: [
    Story => (
      <TooltipContextProvider initialTooltipDictionary={tooltips}>
        <Story />
      </TooltipContextProvider>
    )
  ],
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
                <code>{`import { RadioButtonGroup } from '@harness/uicore'`}</code>
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
      {...filterStorybookArgs(args)}
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

export const WithOptionTooltips = RadioButtonGroupTemplate.bind({})
WithOptionTooltips.args = {
  options: options.map((option, index) => ({ ...option, tooltipId: `option${index + 1}` }))
}

export const WithLargeMargin = RadioButtonGroupTemplate.bind({})
WithLargeMargin.args = {
  margin: 'large',
  background: Color.BLUE_100
}
WithLargeMargin.decorators = [
  ...(WithLargeMargin.decorators || []),
  Story => (
    <div style={{ display: 'flex' }}>
      <div style={{ backgroundColor: 'lightgray', width: '100px' }} />
      <Story />
      <div style={{ backgroundColor: 'lightgray', width: '100px' }} />
    </div>
  )
]
