/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
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
