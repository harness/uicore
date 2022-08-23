/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react';
import type { Meta, Story } from '@storybook/react';

import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks';
import { CopyToClipboard, CopyToClipboardProps } from './CopyToClipboard';

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
        <>
          <Title>CopyToClipboard</Title>
          <Description>{`CopyToClipboard allows an easy to use button for users to copy content`}</Description>
          <Subtitle>
            <>
              <h4>Import</h4>
              <pre>
                <code>{`import { CopyToClipboard, CopyToClipboardProps } from '@harness/uicore';`}</code>
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
        </>;
      }
    }
  }
} as Meta;

export const Basic: Story<CopyToClipboardProps> = args => <CopyToClipboard {...args} />;
