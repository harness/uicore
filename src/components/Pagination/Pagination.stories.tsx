import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'

import Pagination, { PaginationProps } from './Pagination'

export default {
  title: 'Components / Pagination',
  component: Pagination
} as Meta

export const Basic: Story<PaginationProps> = args => {
  const [pageIndex, setPageIndex] = useState(args.pageIndex || 0)

  return <Pagination {...args} pageIndex={pageIndex} gotoPage={setPageIndex} nextPage={setPageIndex} />
}

Basic.args = {
  itemCount: 147,
  pageCount: 15,
  pageSize: 10,
  pageCountClamp: 5
}
