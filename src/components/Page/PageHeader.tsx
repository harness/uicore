import { Color, Heading, Layout } from '../../'
import React from 'react'
import cx from 'classnames'
import css from './PageHeader.css'

export interface PageHeaderProps {
  title: React.ReactNode
  toolbar?: React.ReactNode
  content?: React.ReactNode
  size?: 'small' | 'standard' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
  className?: string
  breadcrumbs?: React.ReactNode
  testId?: string
}

/**
 * PageHeader implements a consistent header for a page header in which title is rendered on
 *  the left and a toolbar is rendered on the right. It also has a consistent box-shadow styling.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  content,
  toolbar,
  size = 'standard',
  className,
  breadcrumbs,
  testId
}) => {
  return (
    <Layout.Horizontal
      flex
      className={cx(css.container, css[size], className)}
      padding={{ left: 'xlarge', right: 'xlarge' }}
      data-testid={testId}
      background={Color.WHITE}>
      <Layout.Vertical>
        {breadcrumbs && <div className={css.breadcrumbsDiv}>{breadcrumbs}</div>}
        {typeof title === 'string' ? (
          <Heading level={2} color={Color.GREY_800} font={{ weight: 'bold' }}>
            {title}
          </Heading>
        ) : (
          <>{title}</>
        )}
      </Layout.Vertical>
      {content}
      {toolbar}
    </Layout.Horizontal>
  )
}
