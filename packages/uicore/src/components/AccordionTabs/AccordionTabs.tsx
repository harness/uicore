/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
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
  accordionProps: Omit<AccordionProps, 'children'>
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
