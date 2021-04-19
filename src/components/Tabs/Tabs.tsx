import React from 'react'
import { Tabs as BpTabs, Tab, ITabsProps } from '@blueprintjs/core'
import css from './Tabs.css'
import cx from 'classnames'

interface TabsProps extends Omit<ITabsProps, 'renderActiveTabPanelOnly'> {
  renderAllTabPanels?: boolean
  children?: React.ReactNode
}

function Tabs(props: TabsProps): JSX.Element {
  const { renderAllTabPanels, children, vertical, ...rest } = props

  return (
    <BpTabs
      {...rest}
      vertical={vertical}
      renderActiveTabPanelOnly={!renderAllTabPanels}
      className={cx(css.main, { [css.vertical]: vertical, [css.horizontal]: !vertical })}>
      {children}
    </BpTabs>
  )
}

export { Tabs, Tab, TabsProps }
