/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { TextInput, Button } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { TextInputProps } from '../TextInput/TextInput'

export default {
  title: 'Form / TextInput',

  component: TextInput,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>TextInput</Title>

            <Subtitle>
              <pre>
                <code>{`import { TextInput }  from '@harness/uicore'`}</code>
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
export const IdleState: Story<TextInputProps> = args => {
  return (
    <>
      <TextInput defaultValue="" placeholder="Placeholder text" {...args} />
    </>
  )
}
export const ErrorState: Story<TextInputProps> = args => {
  return (
    <>
      <TextInput
        defaultValue="Now in error state"
        intent="danger"
        errorText="Not a valid data. Please try again."
        {...args}
      />
    </>
  )
}
export const ErrorStateInPopover: Story<TextInputProps> = args => {
  return (
    <>
      <TextInput
        defaultValue="Show Error icon"
        errorText="Not a valid data. Please try again."
        intent="danger"
        errorInPopover
        {...args}
      />
    </>
  )
}
export const SuccessState: Story<TextInputProps> = args => {
  return (
    <>
      <TextInput placeholder="Placeholder text" intent="success" {...args} />
    </>
  )
}
export const DisabledState: Story<TextInputProps> = args => {
  return (
    <>
      <TextInput placeholder="Placeholder text" disabled {...args} />
    </>
  )
}
export const Icons: Story<TextInputProps> = args => {
  return (
    <>
      <TextInput
        placeholder="Search"
        leftIcon="search"
        rightElement={(<Button minimal icon="arrow-right" intent="primary" margin="none" />) as any}
        {...args}
      />
    </>
  )
}
