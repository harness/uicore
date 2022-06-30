/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { TabNavigation } from '../..'
import { TabNavigationProps } from '../TabNavigation/TabNavigation'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'Components / TabNavigation',

  component: TabNavigation,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>TabNavigation</Title>
            <Subtitle>
              <pre>
                <code>{`import {TabNavigation} from '@harness/uicore'`}</code>
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

export const Basic: Story<TabNavigationProps> = args => {
  const initialEntries = args.links.map(item => item.to)
  return (
    <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
      <TabNavigation {...args} />
    </MemoryRouter>
  )
}

Basic.args = {
  size: 'normal',
  links: [
    { label: 'Tab 1', to: '/tab_1_url' },
    { label: 'Tab 2', to: '/tab_2_url' },
    { label: 'Tab 3', to: '/tab_3_url', disabled: true },
    { label: 'Tab 4', to: '/tab_4_url' }
  ]
}
