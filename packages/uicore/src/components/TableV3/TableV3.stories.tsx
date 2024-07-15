/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import type { ComponentStory, Meta } from '@storybook/react'
import React from 'react'
import { noop } from 'lodash-es'
import { TableV3 } from './TableV3'

export default {
  title: 'Components / TableV3',
  component: TableV3,
  argTypes: {}
} as Meta

export const Basic: ComponentStory<typeof TableV3> = args => {
  return <TableV3 {...args} />
}

Basic.args = {
  data: [
    {
      firstName: 'User',
      lastName: 'one',
      age: 20
    },
    {
      firstName: 'User',
      lastName: 'two',
      age: 25
    },
    {
      firstName: 'User',
      lastName: 'three',
      age: 25
    },
    {
      firstName: 'User',
      lastName: 'four',
      age: 25
    }
  ],
  pagination: {
    itemCount: 100,
    pageCount: 10,
    pageSize: 10,
    gotoPage: noop,
    pageIndex: 0
  },
  columns: [
    {
      header: 'First Name',
      accessorKey: 'firstName'
    },
    {
      header: 'Last Name',
      accessorKey: 'lastName'
    },
    {
      header: 'Age',
      accessorKey: 'age'
    }
  ]
}

export const Scrollable: ComponentStory<typeof TableV3> = args => {
  return (
    <div style={{ width: 700, overflowX: 'scroll', padding: '16px' }}>
      <TableV3 {...args} useDynamicTableSize columnPinning={{ left: ['firstName'] }} />
    </div>
  )
}

Scrollable.args = {
  data: [
    {
      firstName: 'User',
      lastName: 'one',
      age: 20
    },
    {
      firstName: 'User',
      lastName: 'two',
      age: 25
    },
    {
      firstName: 'User',
      lastName: 'three',
      age: 25
    },
    {
      firstName: 'User',
      lastName: 'four',
      age: 25
    }
  ],
  columns: [
    {
      header: 'First Name',
      accessorKey: 'firstName',
      minSize: 300
    },
    {
      header: 'Last Name',
      accessorKey: 'lastName',
      minSize: 300
    },
    {
      header: 'Age',
      accessorKey: 'age',
      minSize: 300
    }
  ]
}
