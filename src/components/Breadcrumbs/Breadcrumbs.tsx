import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { Icon, IconProps } from '../../icons/Icon'
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
              <Icon size={12} padding={{ right: 'xsmall' }} {...link.iconProps} />
            )}
            <Text intent="primary">{link.label}</Text>
          </Link>
          <Icon size={8} name="main-chevron-right" padding={{ right: 'small', left: 'small' }} />
        </Layout.Horizontal>
      ))}
    </Layout.Horizontal>
  )
}
