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

interface ListHeaderProps extends SortDropdownProps {
  totalCount?: number
  className?: string
}

export function ListHeader(props: ListHeaderProps): JSX.Element {
  return (
    <Layout.Horizontal
      flex={{ distribution: 'space-between' }}
      margin={{ bottom: 'small' }}
      className={cx(css.listHeader, props.className)}>
      <Text font={{ variation: FontVariation.H5 }}>Total: {props.totalCount}</Text>
      <SortDropdown
        sortOptions={props.sortOptions}
        onSortMethodChange={props.onSortMethodChange}
        selectedSortMethod={props.selectedSortMethod}
      />
    </Layout.Horizontal>
  )
}
