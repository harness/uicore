/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import cx from 'classnames'
import { FontVariation } from '@harnessio/design-system'
import css from './ListHeader.css'
import { Layout, Text } from '../../'
import { SortDropdown, SortDropdownProps } from '../SortDropdown/SortDropdown'

interface ListHeaderProps extends SortDropdownProps {
  totalCount?: number
  className?: string
}

export function ListHeader(props: ListHeaderProps): JSX.Element {
  const { totalCount, className, ...rest } = props
  return (
    <Layout.Horizontal
      flex={{ distribution: 'space-between' }}
      margin={{ bottom: 'small' }}
      className={cx(css.listHeader, className)}>
      <Text font={{ variation: FontVariation.H5 }}>Total: {totalCount}</Text>
      <SortDropdown {...rest} />
    </Layout.Horizontal>
  )
}
