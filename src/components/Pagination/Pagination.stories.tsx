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
