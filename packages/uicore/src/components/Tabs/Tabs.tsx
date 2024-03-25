/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { Tabs as BpTabs, Tab, ITabsProps, ITabProps } from '@blueprintjs/core'
import css from './Tabs.css'
import cx from 'classnames'

import { Icon, IconProps } from '@harnessio/icons'

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
  const { title, iconProps, id, hidden, ...rest } = props

  if (hidden) return null

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
