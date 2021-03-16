import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Tabs, Tab, TabsProps } from './Tabs'

export default {
  title: 'Components / Tabs',
  component: Tabs
} as Meta

export const Horizontal: Story<TabsProps> = () => (
  <Tabs id={'horizontalTabs'} defaultSelectedTabId={'tab1'}>
    <Tab id={'tab1'} title={'Tab 1 title'} panel={<div>Tab 1 content</div>} />
    <Tab id={'tab2'} title={'Tab 2 title'} panel={<div>Tab 2 content</div>} />
    <Tab id={'tab3'} title={'Tab 3 title'} panel={<div>Tab 3 content</div>} disabled />
  </Tabs>
)
export const Vertical: Story<TabsProps> = () => (
  <Tabs id={'verticalTabs'} defaultSelectedTabId={'tab1'} vertical>
    <Tab id={'tab1'} title={'Tab 1 title'} panel={<div>Tab 1 content</div>} />
    <Tab id={'tab2'} title={'Tab 2 title'} panel={<div>Tab 2 content</div>} disabled />
    <Tab id={'tab3'} title={'Longer Tab 3 title'} panel={<div>Tab 3 content</div>} />
  </Tabs>
)
