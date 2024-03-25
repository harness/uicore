/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { CopyToClipboard, CopyToClipboardProps } from './CopyToClipboard'

export default {
  title: 'Components / CopyToClipboard',
  component: CopyToClipboard,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        ;<>
          <Title>CopyToClipboard</Title>
          <Description>{`CopyToClipboard allows an easy to use button for users to copy content`}</Description>
          <Subtitle>
            <>
              <h4>Import</h4>
              <pre>
                <code>{`import { CopyToClipboard, CopyToClipboardProps } from '@harnessio/uicore';`}</code>
              </pre>
              <h4>Types</h4>
              <pre>
                <code>
                  {`interface CopyToClipboardProps {
  content: string;
  showFeedback?: boolean;
  iconSize?: number;
}`}
                </code>
              </pre>
            </>
          </Subtitle>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />

          <Stories />
        </>
      }
    }
  }
} as Meta

export const Basic: Story<CopyToClipboardProps> = args => <CopyToClipboard {...args} />
