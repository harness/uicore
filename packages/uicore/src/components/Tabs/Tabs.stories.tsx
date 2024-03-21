/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Tabs, TabsProps } from './Tabs'

export default {
  title: 'Components / Tabs',
  component: Tabs
} as Meta
export const Horizontal: Story<TabsProps> = () => (
  <Tabs
    id={'horizontalTabs'}
    defaultSelectedTabId={'tab1'}
    tabList={[
      { id: 'tab1', title: 'Tab 1 title', panel: <div>Tab 1 content</div> },
      { id: 'tab2', title: 'Tab 2 title', panel: <div>Tab 2 content</div> },
      { id: 'tab3', title: 'Tab 3 title', panel: <div>Tab 3 content</div> }
    ]}
  />
)
export const HorizontalWithIcons: Story<TabsProps> = () => (
  <Tabs
    id={'horizontalTabs'}
    defaultSelectedTabId={'tab1'}
    tabList={[
      { id: 'tab1', title: 'Tab 1 title', panel: <div>Tab 1 content</div>, iconProps: { name: 'gear' } },
      { id: 'tab2', title: 'Tab 2 title', panel: <div>Tab 2 content</div>, iconProps: { name: 'gear' } },
      { id: 'tab3', title: 'Tab 3 title', panel: <div>Tab 3 content</div>, iconProps: { name: 'gear' }, disabled: true }
    ]}></Tabs>
)

export const Vertical: Story<TabsProps> = () => (
  <Tabs
    id={'verticalTabs'}
    vertical
    defaultSelectedTabId={'tab1'}
    tabList={[
      { id: 'tab1', title: 'Tab 1 title', panel: <div>Tab 1 content</div> },
      { id: 'tab2', title: 'Tab 2 title', panel: <div>Tab 2 content</div> },
      { id: 'tab3', title: 'Tab 3 title', panel: <div>Tab 3 content</div> }
    ]}
  />
)

export const VerticalWithIcons: Story<TabsProps> = () => (
  <Tabs
    id={'verticalTabs'}
    vertical
    defaultSelectedTabId={'tab1'}
    tabList={[
      { id: 'tab1', title: 'Tab 1 title', panel: <div>Tab 1 content</div>, iconProps: { name: 'gear' } },
      { id: 'tab2', title: 'Tab 2 title', panel: <div>Tab 2 content</div>, iconProps: { name: 'gear' } },
      { id: 'tab3', title: 'Tab 3 title', panel: <div>Tab 3 content</div>, iconProps: { name: 'gear' } }
    ]}
  />
)
