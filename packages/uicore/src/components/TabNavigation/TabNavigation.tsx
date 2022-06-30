/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Layout } from '../../layouts/Layout'
import css from './TabNavigation.css'
import { NavLink } from 'react-router-dom'
import { TabNavigationSize } from './TabNavigationSize'
import cx from 'classnames'

interface NavigationLink {
  label: string
  to: string
  disabled?: boolean
}

export interface TabNavigationProps {
  links: NavigationLink[]
  size?: TabNavigationSize
}

export const TabNavigation: React.FC<TabNavigationProps> = props => {
  const { links, size = 'normal' } = props
  return (
    <Layout.Horizontal className={css.container} spacing={size === 'small' ? 'small' : 'medium'}>
      {links.map(link => (
        <NavLink
          key={link.to}
          className={cx(css.tags, {
            [css.disabled]: link.disabled,
            [css.small]: size === 'small'
          })}
          activeClassName={css.active}
          to={link.to}
          onClick={e => link.disabled && e.preventDefault()}>
          {link.label}
        </NavLink>
      ))}
    </Layout.Horizontal>
  )
}
