/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import { FontVariation } from '@harness/design-system'
import css from './ListHeader.css'
import { Layout, Text } from '../../'
import { SortDropdown, SortDropdownProps } from '../SortDropdown/SortDropdown'

export interface ListHeaderProps extends SortDropdownProps {
  totalCount?: number
  className?: string
  preDropdownContent?: React.ReactNode
  postDropdownContent?: React.ReactNode
}

export function ListHeader(props: ListHeaderProps): JSX.Element {
  const { totalCount, className, preDropdownContent, postDropdownContent, ...rest } = props
  return (
    <Layout.Horizontal
      flex={{ distribution: 'space-between' }}
      margin={{ bottom: 'small' }}
      className={cx(css.listHeader, className)}>
      <Text font={{ variation: FontVariation.H5 }}>Total: {totalCount}</Text>
      <Layout.Horizontal>
        {preDropdownContent}
        <SortDropdown {...rest} />
        {postDropdownContent}
      </Layout.Horizontal>
    </Layout.Horizontal>
  )
}
