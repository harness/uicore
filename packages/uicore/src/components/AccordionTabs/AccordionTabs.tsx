/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ITabProps, Tab } from '@blueprintjs/core'
import { Accordion, AccordionProps } from '../Accordion/Accordion'
import { Tabs, TabsProps } from '../Tabs/Tabs'
import React from 'react'

export interface TabListProps extends Omit<ITabProps, 'id' | 'title'> {
  id: string
  title: React.ReactNode
  dataTestId?: string
}

export interface AccordionTabsProps {
  tabList: TabListProps[]
  tabsProps: TabsProps
  accordionProps: Omit<AccordionProps, 'children'> & {
    /** The controlled active ID for the Accordion. Must be provided for synchronization with Tabs. */
    controlledActiveId: string
  }
}

const AccordionTabs: React.FC<AccordionTabsProps> = ({ tabList, tabsProps, accordionProps, children }) => {
  const accordionChildren = tabList.map(tabItem => (
    <Accordion.Panel
      key={tabItem.id}
      id={tabItem.id}
      summary={tabItem.title}
      details={tabItem.panel}
      data-testid={tabItem.dataTestId}
      disabled={tabItem.disabled}
    />
  ))

  return (
    <>
      <Tabs {...tabsProps}>
        {tabList.map(tabItem => (
          <Tab
            key={tabItem.id}
            id={tabItem.id}
            title={tabItem.title}
            disabled={tabItem.disabled}
            className={tabItem.className}
            panelClassName={tabItem.panelClassName}
          />
        ))}
      </Tabs>
      {children}
      <Accordion {...accordionProps}>
        {/* Rendering the Accordion.Panel components through tablist */}
        {accordionChildren}
      </Accordion>
    </>
  )
}

export { AccordionTabs }
