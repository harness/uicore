import React from 'react'
import { Tabs as BpTabs, Tab, ITabsProps, ITabProps } from '@blueprintjs/core'
import css from './Tabs.css'
import cx from 'classnames'

import { Icon, IconProps } from '../../icons/Icon'

interface TabProps extends ITabProps {
  iconProps?: IconProps
}
interface TabsProps extends Omit<ITabsProps, 'renderActiveTabPanelOnly'> {
  renderAllTabPanels?: boolean
  children?: React.ReactNode
  tabList: TabProps[]
}

function tab(props: TabProps) {
  const { title, iconProps, ...rest } = props
  const titleContent = iconProps ? (
    <span>
      <Icon {...iconProps} padding={{ right: 'small' }} />
      {title}
    </span>
  ) : (
    title
  )
  return <Tab title={titleContent} {...rest} />
}

function Tabs(props: TabsProps) {
  const { renderAllTabPanels, vertical, tabList, ...rest } = props
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
    </BpTabs>
  )
}

export { Tabs, TabProps, TabsProps }
