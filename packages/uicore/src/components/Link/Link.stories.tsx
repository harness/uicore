/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-alert */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { Link, Layout } from '../..'
import { LinkProps } from '../Button/Button'
import { Icon } from '@harnessio/icons'

export default {
  title: 'Components / Link',

  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Link</Title>
            <Description>{`## Link is being depricated, avoid using it
\`<Link/>\` component aims to make sure the look and feel of all the links in UI are the same. This is why we implement our own instead of using \`<Link/>\` component from React Router, or \`<AnchorButton/>\` from Blueprint.

One improvement we added into \`<Link/>\` component is that by default it adds \`rel='noreferrer noopener'\` when \`target\` is set to \`_blank\`. This makes sure we don't have the [target blank security issue](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md).

When a link is disabled, all events are ignored.`}</Description>
            <Subtitle>
              <>
                <pre>
                  <code>{`import {Link} from '@harness/uicore'`}</code>
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
  },
  decorators: [Story => <Story />]
} as Meta
export const Basic: Story<LinkProps> = args => {
  return (
    <Layout.Horizontal spacing="small">
      <Link href="/dashboard" {...args}>
        Dashboard
      </Link>
      <Icon name="dot" color="grey300" />
      <Link href="//harness.io" target="_blank" {...args}>
        External Link
      </Link>
      <Icon name="dot" color="grey300" />
      <Link disabled href="/link" {...args}>
        Disabled Link
      </Link>
      <Link withoutHref onClick={() => alert('Click')} {...args}>
        Link (without Href - Act like a Button)
      </Link>
    </Layout.Horizontal>
  )
}
