/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { Icon, IconProps } from '@harness/icons'
import { Layout } from '../../layouts/Layout'
import { Text } from '../Text/Text'
import css from './Breadcrumbs.css'

export interface Breadcrumb {
  url: string
  label: string
  iconProps?: IconProps
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
      {links.map((link: Breadcrumb, index: number) => (
        <Layout.Horizontal flex={{ align: 'center-center', justifyContent: 'flex-start' }} key={index}>
          <Link className={css.breadcrumb} to={link.url}>
            {link.iconProps && link.iconProps.name && (
              <Icon size={16} padding={{ right: 'xsmall' }} {...link.iconProps} />
            )}
            <Text intent="primary" font={{ size: 'small' }}>
              {link.label}
            </Text>
          </Link>
          <Icon size={8} name="main-chevron-right" color="grey500" padding={{ right: 'xsmall', left: 'xsmall' }} />
        </Layout.Horizontal>
      ))}
    </Layout.Horizontal>
  )
}
