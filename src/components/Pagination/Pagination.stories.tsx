/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'

import Pagination, { PaginationProps } from './Pagination'

export default {
  title: 'Components / Pagination',
  component: Pagination
} as Meta

export const Basic: Story<PaginationProps> = args => {
  const [pageIndex, setPageIndex] = useState(args.pageIndex || 0)

  return <Pagination {...args} pageIndex={pageIndex} gotoPage={setPageIndex} />
}

Basic.args = {
  itemCount: 147,
  pageCount: 15,
  pageSize: 10
}

export const VariablePageSize: Story<PaginationProps> = args => {
  const [pageIndex, setPageIndex] = useState(args.pageIndex || 0)
  const [pageSize, setpageSize] = useState(args.pageSize || 0)

  return (
    <Pagination
      {...args}
      pageSize={pageSize}
      pageIndex={pageIndex}
      gotoPage={setPageIndex}
      pageSizeOptions={args.pageSizeOptions}
      onPageSizeChange={setpageSize}
    />
  )
}

VariablePageSize.args = {
  itemCount: 147,
  pageCount: 15,
  pageSize: 10,
  pageSizeOptions: [5, 10, 25, 50]
}

export const HideNumberButtonsAtBreakpoint: Story<PaginationProps> = args => <Pagination {...args} />

HideNumberButtonsAtBreakpoint.args = {
  hidePageNumbers: false,
  itemCount: 147,
  pageCount: 15,
  pageSize: 10,
  breakAt: 830,
  gotoPage: () => null
}
