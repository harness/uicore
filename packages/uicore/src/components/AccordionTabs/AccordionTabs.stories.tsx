/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { Story, Meta } from '@storybook/react'

import { AccordionTabs, AccordionTabsProps } from './AccordionTabs'

export default {
  title: 'Components/AccordionTabs',
  component: AccordionTabs
} as Meta

const Template: Story<AccordionTabsProps> = args => {
  const [selectedTabId, setSelectedTabId] = React.useState(args.tabsProps.selectedTabId)

  const handleTabChange = (newTabId: string, prevTabId: string, event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setSelectedTabId(newTabId)
    args.tabsProps.onChange?.(newTabId, prevTabId, event)
  }

  const handleAccordionChange = (tab: string) => {
    setSelectedTabId(tab)
    args.accordionProps.onChange?.(tab)
  }

  return (
    <AccordionTabs
      {...args}
      tabsProps={{ ...args.tabsProps, selectedTabId, onChange: handleTabChange }}
      accordionProps={{
        ...args.accordionProps,
        controlledActiveId: selectedTabId as string,
        onChange: handleAccordionChange
      }}
    />
  )
}

export const Basic = Template.bind({})
Basic.args = {
  tabList: [
    {
      id: 'tab1',
      title: 'Tab 1',
      panel: <div>Tab 1 Content</div>
    },
    {
      id: 'tab2',
      title: 'Tab 2',
      panel: <span>Tab 2 Content</span>
    },
    {
      id: 'tab3',
      title: 'Tab 3',
      panel: <div>Tab 3 Content</div>
    },
    {
      id: 'tab4',
      title: 'Tab 4',
      panel: <span>Tab 4 Content</span>
    }
  ],
  tabsProps: {
    id: 'tabs',
    selectedTabId: 'tab1',
    onChange: (newTabId, prevTabId) => {
      // Handle tab change
      // eslint-disable-next-line no-console
      console.log('changed tabs', newTabId, prevTabId)
    }
  },
  accordionProps: {
    onChange: tabs => {
      // Handle accordion panel change
      // eslint-disable-next-line no-console
      console.log('changed accordion', tabs)
    },
    controlledActiveId: 'tab1'
  }
}
