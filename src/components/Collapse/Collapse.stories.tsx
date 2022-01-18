/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Collapse, Layout } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { CollapseProps } from '../Collapse/Collapse'

export default {
  title: 'Components / Collapse',

  component: Collapse,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Collapse</Title>

            <Subtitle>
              <pre>
                <code>{`import { Collapse }  from '@harness/uicore'`}</code>
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
export const Basic: Story<CollapseProps> = args => {
  return (
    <Layout.Horizontal spacing="small">
      <Collapse
        isOpen={true}
        heading={'Click here to collapse or expand'}
        isRemovable={true}
        onRemove={() => {
          // eslint-disable-next-line no-alert
          alert('This component will get removed')
        }}
        {...args}>
        Hello world The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick
        brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog The quick brown fox jumps
        over the lazy dog The quick brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox
        jumps over the lazy dog The quick brown fox jumps over the lazy dog
      </Collapse>
    </Layout.Horizontal>
  )
}
