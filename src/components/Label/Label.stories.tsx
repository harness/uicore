import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Label, Layout, TextInput } from '../..'
import { LabelProps } from '../Label/Label'

export default {
  title: 'Form / Label',

  component: Label,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Label</Title>
            <Subtitle>
              <pre>
                <code>{`import {Label} from '@wings-software/uicore'`}</code>
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
export const Basic: Story<LabelProps> = args => {
  return (
    <Layout.Vertical spacing="small">
      <Label {...args}>My Label</Label>
      <TextInput defaultValue="" placeholder="Placeholder text" />
    </Layout.Vertical>
  )
}
export const Basic2: Story<LabelProps> = args => {
  return (
    <div style={{ width: '200px' }}>
      <Layout.Horizontal spacing="small" flex={{ align: 'center-center' }}>
        <Label {...args}>My Label</Label>
        <TextInput defaultValue="" placeholder="Placeholder text" />
      </Layout.Horizontal>
    </div>
  )
}
