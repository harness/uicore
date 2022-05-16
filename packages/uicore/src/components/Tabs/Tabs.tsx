/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Tabs as BpTabs, Tab, ITabsProps, ITabProps } from '@blueprintjs/core'
import css from './Tabs.css'
import cx from 'classnames'

import { Icon, IconProps } from '@harness/icons'

interface TabProps extends ITabProps {
  iconProps?: IconProps
}
interface TabsProps extends Omit<ITabsProps, 'renderActiveTabPanelOnly'> {
  renderAllTabPanels?: boolean
  children?: React.ReactNode
  // TODO: Remove optional field for tablist when old tab code in ng  is migrated to tablist props usage
  tabList?: TabProps[]
}

function tab(props: TabProps) {
  const { title, iconProps, id, ...rest } = props
  const titleContent = iconProps ? (
    <span>
      <Icon {...iconProps} padding={{ right: 'small' }} />
      {title}
    </span>
  ) : (
    title
  )
  return <Tab key={id} id={id} title={titleContent} {...rest} />
}

function Tabs(props: TabsProps): React.ReactElement {
  const { renderAllTabPanels, vertical, children, tabList = [], ...rest } = props
  const hasIcons = tabList.findIndex(tabProp => tabProp.iconProps?.name) !== -1
  return (
    <BpTabs
      {...rest}
      vertical={vertical}
      renderActiveTabPanelOnly={!renderAllTabPanels}
      className={cx(css.main, {
        [css.vertical]: vertical,
        [css.horizontal]: !vertical,
        [css.icons]: hasIcons && !vertical
      })}>
      {tabList.map(tabProp => {
        return tab(tabProp)
      })}
      {/* TODO: Remove children rendering when old tab code in ng  is migrated to tablist props usage */}
      {/* rendering with children is for backward compatbility. This will be removed once all the code is moved using tablist props */}
      {children}
    </BpTabs>
  )
}

export { Tabs, TabProps, Tab, TabsProps }
