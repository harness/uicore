import { Layout } from '../../'
import React from 'react'
import cx from 'classnames'
import css from './PageSubHeader.css'

export interface PageSubHeaderProps {
  className?: string
}

/**
 * PageSubHeader implements a consistent sub header for a page in which content which is passed as children rendered
 *  with standard padding given by design team - top and bottom: 16px, left and right: 24px
 */
export const PageSubHeader: React.FC<PageSubHeaderProps> = ({ className, children }) => {
  return (
    <Layout.Horizontal flex className={cx(css.container, className)}>
      {children}
    </Layout.Horizontal>
  )
}
