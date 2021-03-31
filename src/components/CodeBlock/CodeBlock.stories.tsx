import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { CodeBlock } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { CodeBlockProps } from '../CodeBlock/CodeBlock'

export default {
  title: 'Components / CodeBlock',

  component: CodeBlock,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>CodeBlock</Title>

            <Subtitle>
              <pre>
                <code>{`import { CodeBlock }  from '@wings-software/uicore'`}</code>
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
export const Basic: Story<CodeBlockProps> = args => {
  return (
    <>
      <CodeBlock allowCopy format="pre" snippet={'kubectl apply -f harness-delegate.yaml'} {...args} />
    </>
  )
}
