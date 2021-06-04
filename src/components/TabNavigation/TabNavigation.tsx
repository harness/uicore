import React from 'react'
import { Layout } from '../../layouts/Layout'
import css from './TabNavigation.css'
import { NavLink } from 'react-router-dom'
import { TabNavigationSize } from './TabNavigationSize'
import cx from 'classnames'

export interface NavigationLink {
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
