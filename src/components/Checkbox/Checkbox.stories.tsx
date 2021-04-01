import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Checkbox } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { CheckboxProps } from '../Checkbox/Checkbox'

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
                <code>{`import { Checkbox }  from '@wings-software/uicore'`}</code>
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
    <>
      <Checkbox label="Not Selected" {...args} />
      <Checkbox label="Selected" checked {...args} />
      <Checkbox label="Disabled" disabled {...args} />
      <Checkbox label="Disabled and Selected" disabled checked {...args} />
    </>
  )
}
