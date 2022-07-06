/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Story, Meta, ComponentStory } from '@storybook/react'
import { noop } from 'lodash-es'
import { TableV2, TableProps } from './TableV2'
import { Icon } from '@harness/icons'

export default {
  title: 'Components / TableV2',
  component: TableV2,
  argTypes: {}
} as Meta

export const Basic: ComponentStory<typeof TableV2> = args => {
  return <TableV2 {...args} sortable={true} onRowClick={() => {}} />
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
