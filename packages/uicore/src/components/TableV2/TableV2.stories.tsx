/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ComponentStory, Meta } from '@storybook/react'
import { noop } from 'lodash-es'
import React from 'react'
import { TableV2 } from './TableV2'
import { Icon } from '@harnessio/icons'

export default {
  title: 'Components / TableV2',
  component: TableV2,
  argTypes: {}
} as Meta

export const Basic: ComponentStory<typeof TableV2> = args => {
  return <TableV2 {...args} sortable={true} onRowClick={noop} />
}
Basic.args = {
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
  },
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
  ]
}

export const Expandable: ComponentStory<typeof TableV2> = args => {
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <pre style={{ margin: 0 }}>
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    ),
    []
  )

  return <TableV2 {...args} sortable={true} renderRowSubComponent={renderRowSubComponent} />
}
Expandable.args = {
  columns: [
    {
      Header: '',
      width: '30px',
      id: 'expander',
      // eslint-disable-next-line react/display-name
      Cell: ({ row }) => {
        return <Icon name={row.isExpanded ? 'chevron-down' : 'chevron-right'} {...row.getToggleRowExpandedProps()} />
      }
    },
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
