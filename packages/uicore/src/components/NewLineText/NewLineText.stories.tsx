/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { NewLineText } from './NewLineText'

// Example text to be used across different scenarios
const exampleText =
  'This is a NewLineText component example. NewLineText component example\nThis is the second line of text.\nThis is the third line of text.\nThis is the fourth line that would be truncated with longer examples.'

export default {
  title: 'Components / NewLineText',
  component: NewLineText,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },
      page: function PageDescription() {
        return (
          <>
            <Title>NewLineText</Title>
            <Subtitle>
              <pre>
                <code>{`import { NewLineText } from '@harness/uicore'`}</code>
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
  argTypes: {
    lineClamp: {
      control: { type: 'number', min: 0, max: 10 }
    },
    children: {
      control: 'text'
    }
  },
  decorators: [Story => <Story />]
} as Meta

export const Examples: Story = () => (
  <div style={{ maxWidth: '300px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Regular NewLineText:</h3>
        <NewLineText>{exampleText}</NewLineText>
      </div>

      <div>
        <h3>NewLineText with line clamp (1 line):</h3>
        <NewLineText lineClamp={1} tooltip={<NewLineText padding={'xsmall'}>{exampleText}</NewLineText>}>
          {exampleText}
        </NewLineText>
      </div>

      <div>
        <h3>NewLineText with line clamp (2 lines):</h3>
        <NewLineText lineClamp={2} tooltip={<NewLineText padding={'xsmall'}>{exampleText}</NewLineText>}>
          {exampleText}
        </NewLineText>
      </div>
    </div>
  </div>
)
