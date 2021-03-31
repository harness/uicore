import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Tag, Intent, Layout } from '../..'
import { ITagProps } from '@blueprintjs/core'

export default {
  title: 'Components / Tag',

  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Tag</Title>
            <Subtitle>
              <pre>
                <code>{`import {Tag} from '@wings-software/uicore'`}</code>
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
  decorators: [
    Story => (
      <Layout.Horizontal spacing="small">
        <Story />
      </Layout.Horizontal>
    )
  ]
} as Meta
export const Basic: Story<ITagProps> = args => {
  return (
    <>
      <Tag {...args}>Default</Tag>
      <Tag intent={Intent.PRIMARY} {...args}>
        Informative
      </Tag>
      <Tag intent={Intent.SUCCESS} {...args}>
        Success
      </Tag>
      <Tag intent={Intent.WARNING} {...args}>
        Warning
      </Tag>
      <Tag intent={Intent.DANGER} {...args}>
        Critical
      </Tag>
    </>
  )
}
export const MinimalTag: Story<ITagProps> = args => {
  return (
    <>
      <Tag minimal {...args}>
        Default
      </Tag>
      <Tag intent={Intent.PRIMARY} minimal {...args}>
        Informative
      </Tag>
      <Tag intent={Intent.SUCCESS} minimal {...args}>
        Success
      </Tag>
      <Tag intent={Intent.WARNING} minimal {...args}>
        Warning
      </Tag>
      <Tag intent={Intent.DANGER} minimal {...args}>
        Critical
      </Tag>
    </>
  )
}
export const LargeTag: Story<ITagProps> = args => {
  return (
    <>
      <Tag large {...args}>
        Default
      </Tag>
      <Tag intent={Intent.PRIMARY} large {...args}>
        Informative
      </Tag>
      <Tag intent={Intent.SUCCESS} large {...args}>
        Success
      </Tag>
      <Tag intent={Intent.WARNING} large {...args}>
        Warning
      </Tag>
      <Tag intent={Intent.DANGER} large {...args}>
        Critical
      </Tag>
    </>
  )
}
