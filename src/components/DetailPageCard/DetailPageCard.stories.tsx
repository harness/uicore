import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { ContentType, DetailPageCard } from './DetailPageCard'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { DetailPageCardProps } from './DetailPageCard'
import { Checkbox } from '../..'

export default {
  title: 'Components / DetailPageCard',
  component: DetailPageCard,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },
      page: function PageDescription() {
        return (
          <>
            <Title>DetailPageCard</Title>
            <Subtitle>
              <pre>
                <code>{`import { DetailPageCard }  from '@harness/uicore'`}</code>
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

export const Basic: Story<DetailPageCardProps> = args => {
  return (
    <>
      <DetailPageCard {...args} />
    </>
  )
}

Basic.args = {
  title: 'Main Title',
  content: [
    { label: 'Name', value: 'Cluster Name' },
    { label: 'GitOps Agent ', value: 'Agent 1' },
    { label: 'Cache Info ', value: 'Cache 1', newTitle: 'Subtitle 1' },
    { label: 'Name', value: 'Cluster Name' },
    {
      label: 'GitOps Agent ',
      value: <Checkbox label="selected" />,
      type: ContentType.CUSTOM,
      newTitle: 'Subtitle 2'
    }
  ]
}
