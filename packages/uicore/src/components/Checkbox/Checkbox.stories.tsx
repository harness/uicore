/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Checkbox, CheckboxProps, CheckboxVariant } from './Checkbox'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { Heading } from '../Heading/Heading'

export default {
  title: 'Components / Checkbox',

  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Checkbox</Title>

            <Description>
              {`Checkbox component reuses Blueprint's Checkbox and implements the look and feel of
              [HDL](https://projects.invisionapp.com/d/?origin=v7#/projects/prototypes/17628604). Checkbox API is
              exactly the same as [Blueprint's Checkbox](https://blueprintjs.com/docs/#core/components/checkbox).
           `}
            </Description>
            <Subtitle>
              <pre>
                <code>{`import { Checkbox }  from '@harnessio/uicore'`}</code>
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

export const Basic: Story<CheckboxProps> = args => {
  return (
    <article style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
      <section>
        <Heading level="2" margin={{ bottom: 'medium' }}>
          Active
        </Heading>
        <Checkbox label="Not Selected" {...args} />
        <Checkbox label="Selected" checked {...args} />
        <Checkbox label="Indeterminate" indeterminate {...args} />
      </section>
      <section>
        <Heading level="2" margin={{ bottom: 'medium' }}>
          Disabled
        </Heading>
        <Checkbox label="Disabled" disabled {...args} />
        <Checkbox label="Disabled and Selected" disabled checked {...args} />
        <Checkbox label="Indeterminate and Disabled" disabled indeterminate {...args} />
      </section>
    </article>
  )
}

export const ActiveState: Story<CheckboxProps> = args => {
  return (
    <>
      <Checkbox label="Not Selected" {...args} />
      <Checkbox label="Selected" checked {...args} />
      <Checkbox label="Indeterminate" indeterminate {...args} />
    </>
  )
}

export const DisabledState: Story<CheckboxProps> = args => {
  return (
    <>
      <Checkbox label="Not Selected" disabled {...args} />
      <Checkbox label="Selected" disabled checked {...args} />
      <Checkbox label="Indeterminate" disabled indeterminate {...args} />
    </>
  )
}

export const VariantBoxed: Story<CheckboxProps> = args => {
  return (
    <>
      <Checkbox margin={{ bottom: 'small' }} label="Not Selected" {...args} variant={CheckboxVariant.BOXED} />
      <Checkbox margin={{ bottom: 'small' }} label="Selected" checked {...args} variant={CheckboxVariant.BOXED} />
      <Checkbox label="Indeterminate" disabled indeterminate {...args} variant={CheckboxVariant.BOXED} />
    </>
  )
}
