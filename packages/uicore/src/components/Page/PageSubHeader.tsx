/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

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
