/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { Icon, IconProps } from '@harnessio/icons'
import { Layout } from '../../layouts/Layout'
import { Text } from '../Text/Text'
import css from './Breadcrumbs.css'

export interface Breadcrumb {
  url: string
  label: string
  iconProps?: IconProps
  onClick?: () => void
}
export interface BreadcrumbsProps {
  links: Breadcrumb[]
  className?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ links = [], className = '' }) => {
  return (
    <Layout.Horizontal
      flex={{ align: 'center-center', justifyContent: 'flex-start' }}
      className={cx(css.breadcrumbs, className)}>
      {links.map((link: Breadcrumb) => {
        return (
          <Layout.Horizontal flex={{ align: 'center-center', justifyContent: 'flex-start' }} key={link.label}>
            <Link
              to={link.url}
              className={css.breadcrumb}
              onClick={event => {
                if (link.onClick) {
                  event.preventDefault()
                  link.onClick()
                }
              }}>
              {link.iconProps && link.iconProps.name && (
                <Icon size={16} padding={{ right: 'xsmall' }} {...link.iconProps} />
              )}
              <Text intent="primary" font={{ size: 'small' }}>
                {link.label}
              </Text>
            </Link>
            <Icon size={8} name="main-chevron-right" color="grey500" padding={{ right: 'xsmall', left: 'xsmall' }} />
          </Layout.Horizontal>
        )
      })}
    </Layout.Horizontal>
  )
}
