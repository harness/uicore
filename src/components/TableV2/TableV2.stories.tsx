/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Story, Meta } from '@storybook/react'
import { noop } from 'lodash-es'

import { TableV2, TableProps } from './TableV2'

interface Data {
  name: string
  age: number
}

export default {
  title: 'Components / TableV2',
  component: TableV2,
  argTypes: {}
} as Meta

const Template: Story<TableProps<Data>> = args => <TableV2 {...args} sortable={true} />

export const Basic = Template.bind({})

Basic.args = {
  columns: [
    {
      Header: 'Name',
      accessor: row => row.name,
      id: 'name'
    },
    {
      Header: 'Age',
      accessor: row => row.age,
      id: 'age'
    }
  ],
  data: [
    {
      name: 'User 1',
      age: 20
    },
    {
      name: 'User 2',
      age: 25
    },
    {
      name: 'User 3',
      age: 25
    },
    {
      name: 'User 4',
      age: 25
    }
  ],
  pagination: {
    itemCount: 100,
    pageCount: 10,
    pageSize: 10,
    gotoPage: noop,
    pageIndex: 0
  }
}
