/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable no-console */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { DateInput } from '../..'
import { DateInputProps } from '../DateInput/DateInput'
export default {
  title: 'Form / DateInput',

  component: DateInput,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>DateInput</Title>
            <Subtitle>
              <pre>
                <code>{`import {DateInput} from '@harness/uicore'`}</code>
              </pre>
            </Subtitle>
            <Description>{`DateInput use cases

- Show date and date time and return response in milliseconds in strings
- Use Calender for date and date time selection
- Uses same props as TextInput
- Support for custom variables like current() & \${variable} workflow variables
  - Plus/Minus Weeks/Days/Hours/Minutes/Seconds similar to DurationInput
  - Returns the response as current() \${variable} +- duration
- Show valid date input`}</Description>
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
export const ShowDate: Story<DateInputProps> = args => {
  return <DateInput {...args} />
}
export const ShowTime: Story<DateInputProps> = args => {
  return <DateInput timePrecision="minute" {...args} />
}
export const ShowDateWithValue: Story<DateInputProps> = args => {
  return <DateInput value="1579773229467" {...args} />
}
export const ShowTimeWithValue: Story<DateInputProps> = args => {
  return <DateInput timePrecision="minute" value="1579773229467" {...args} />
}
export const ShowDatewithCustomVariables: Story<DateInputProps> = args => {
  // eslint-disable-next-line no-console
  return <DateInput allowVariables={true} onChange={(value, error) => console.log(value, error)} {...args} />
}
export const ShowTimeWithCustomVariables: Story<DateInputProps> = args => {
  return (
    <DateInput
      timePrecision="minute"
      allowVariables={true}
      onChange={(value, error) => console.log(value, error)}
      {...args}
    />
  )
}
export const ShowDateWithCustomVariablesWithValue: Story<DateInputProps> = args => {
  return (
    <DateInput
      allowVariables={true}
      value="current() + 7200000"
      onChange={(value, error) => console.log(value, error)}
      {...args}
    />
  )
}
export const ShowTimeWithCustomVariablesWithValue: Story<DateInputProps> = args => {
  return (
    <DateInput
      timePrecision="minute"
      allowVariables={true}
      value="${App.TIME_LOCAL} - 777600000"
      onChange={(value, error) => console.log(value, error)}
      {...args}
    />
  )
}
export const ShowDateWithCustomVariablesWithErrorValue: Story<DateInputProps> = args => {
  return <DateInput allowVariables={true} value="current() + 2h 10m + 2" {...args} />
}
export const ShowTimeWithCustomVariablesWithErrorValue: Story<DateInputProps> = args => {
  return <DateInput timePrecision="minute" allowVariables={true} value="current() + w X" {...args} />
}
