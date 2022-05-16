/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

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
                <code>{`import { CodeBlock }  from '@harness/uicore'`}</code>
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
