/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { TagGroup, TagItem } from './TagGroup'

// Example tags to be used across different scenarios
const exampleStringTags = ['First Tag', 'Second Tag', 'Third Tag', 'Fourth Tag']

// Example tags with different types
const exampleTypedTags: TagItem[] = [
  { text: 'Default Tag', type: 'default' },
  { text: 'Primary Tag', type: 'primary' },
  { text: 'Success Tag', type: 'success' },
  { text: 'Warning Tag', type: 'warning' },
  { text: 'Danger Tag', type: 'danger' }
]

export default {
  title: 'Components / TagGroup',
  component: TagGroup,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },
      page: function PageDescription() {
        return (
          <>
            <Title>TagGroup</Title>
            <Subtitle>
              <pre>
                <code>{`import { TagGroup } from '@harness/uicore'`}</code>
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
    tags: {
      control: 'array'
    },
    className: {
      control: 'text'
    }
  },
  decorators: [Story => <Story />]
} as Meta

export const Examples: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3>Single Tag:</h3>
      <TagGroup tags={['Single Tag']} />
    </div>

    <div>
      <h3>Multiple String Tags:</h3>
      <TagGroup tags={exampleStringTags} />
    </div>

    <div>
      <h3>Multiple Typed Tags:</h3>
      <TagGroup tags={exampleTypedTags} />
    </div>
  </div>
)
