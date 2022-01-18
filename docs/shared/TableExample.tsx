/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useMemo, useState } from 'react'
import { Text, Select, Table } from '../static/index'
import pokedex from './pokedex.json'
import { Row } from 'react-table'

export function TableExample() {
  const columns = useMemo(
    () => [
      {
        Header: 'Pokemon Name',
        accessor: 'name'
      },
      {
        Header: 'Pokemon Type',
        accessor: 'type',
        Cell: props => {
          if (props.value.length === 1) {
            const textProps =
              props.value[0] === 'Fire'
                ? {
                    intent: 'danger',
                    icon: 'flame'
                  }
                : {
                    intent: 'primary',
                    icon: 'tint'
                  }
            return <Text {...textProps}>{props.value}</Text>
          }
          const items = props.value.map(label => ({ label: label, value: label }))
          return <Select items={items} />
        }
      }
    ],
    []
  )
  const data = useMemo(() => pokedex.slice(0, 7), [])
  return (
    <Table
      className="pokemonTable"
      bpTableProps={{ bordered: true, condensed: true, striped: true }}
      columns={columns}
      data={data}
    />
  )
}

function renderCell(cell, index, setChecked) {
  if (index === 0) {
    return <input type="checkbox" onClick={() => setChecked()} />
  }
  if (index !== 2) {
    return cell.value
  }

  return (
    <Select
      items={[
        { value: 'service1_uuid', label: 'service1' },
        { value: 'service1_uuid', label: 'service2' }
      ]}
    />
  )
}

function CustomRow(props: Row<{ tier: string; service: string }>) {
  const { cells, ...otherProps } = props
  const [isChecked, setChecked] = useState(false)

  return (
    <tr {...otherProps} style={{ backgroundColor: isChecked ? 'var(--blue-700)' : '' }}>
      {cells.map((cell, index) => {
        const { key: cellKey, ...otherCellProps } = cell.getCellProps()
        return (
          <td key={cellKey} {...otherCellProps}>
            {renderCell(cell, index, () => setChecked(!isChecked))}
          </td>
        )
      })}
    </tr>
  )
}

export function TableExample2() {
  const tableColumns = useMemo(
    () => [
      {
        Header: _ => {
          return <input type="checkbox" />
        },
        accessor: 'tierSelected'
      },
      {
        Header: 'Tier',
        accessor: 'tier'
      },
      {
        Header: 'Service',
        accessor: 'service'
      }
    ],
    []
  )
  const data = useMemo(
    () => [
      { tier: 'Tier1', service: '' },
      { tier: 'Tier2', service: '' },
      { tier: 'Tier3', service: '' },
      { tier: 'Tier4', service: '' },
      { tier: 'Tier5', service: '' },
      { tier: 'Tier6', service: '' }
    ],
    []
  )
  return (
    <Table
      columns={tableColumns}
      bpTableProps={{ bordered: true, condensed: true, striped: true }}
      data={data}
      renderCustomRow={row => <CustomRow {...row} />}
    />
  )
}
