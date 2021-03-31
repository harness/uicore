/* eslint-disable no-console */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { DurationInput, DurationInputProps, Layout, Label, TextInput } from '../..'

export default {
  title: 'Form / DurationInput',

  component: DurationInput,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>DurationInput</Title>
            <Subtitle>
              <pre>
                <code>{`import {DurationInput} from '@wings-software/uicore'`}</code>
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
export const Basic: Story<DurationInputProps> = args => {
  return <DurationInput value={93600000} onChange={time => console.log(time)} {...args} />
}
export const DurationInputExample: Story<DurationInputProps> = args => {
  const [state, setState] = React.useState(93600000)

  return (
    <Layout.Horizontal spacing="medium" id="duration-input-example">
      <Layout.Vertical spacing="small">
        <Label>Input duration</Label>
        <DurationInput
          value={state}
          onChange={val => {
            console.log(val)
            setState(val as number)
          }}
          {...args}
        />
      </Layout.Vertical>
      <Layout.Vertical spacing="small">
        <Label>Parsed value</Label>
        <TextInput value={state.toString()} disabled />
      </Layout.Vertical>
    </Layout.Horizontal>
  )
}
export const UsageRetainingStringInputDurationAndSupportsExpressionValue: Story<DurationInputProps> = args => {
  return (
    <DurationInput
      valueInTimeFormat="2d 2h"
      allowVariables={true}
      allowedUnits={['w', 'd', 'h', 'm']}
      placeholder="Enter w/d/h/m or an expression (${...})"
      onChange={time => console.log(time)}
      {...args}
    />
  )
}
