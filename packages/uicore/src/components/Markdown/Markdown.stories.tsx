/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Layout } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import Markdown, { MarkdownProps } from './Markdown'

export default {
  title: 'Components / Markdown',
  component: Markdown,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Markdown</Title>
            <Description>{`Markdown component renders richtext with the markup preserved`}</Description>
            <Subtitle>
              <>
                <h4>Import</h4>
                <pre>
                  <code>{`import { Markdown }  from '@harness/uicore'`}</code>
                </pre>
                <h4>Types</h4>
                <pre>
                  <code>
                    {`interface MarkdownProps {
    value: string
}
`}
                  </code>
                </pre>
              </>
            </Subtitle>
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />

            <Stories />
          </>
        )
      }
    }
  }
} as Meta

export const Basic: Story<MarkdownProps> = () => (
  <Layout.Horizontal spacing="large">
    <Markdown value="```hello```" />
  </Layout.Horizontal>
)
