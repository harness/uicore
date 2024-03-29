/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { HTMLTable, IHTMLTableProps } from '@blueprintjs/core'
import { useTable, Column, Row } from 'react-table'

// eslint-disable-next-line @typescript-eslint/ban-types
export interface TableProps<T extends object> {
  columns: Array<Column<T>>
  data: T[]
  renderCustomRow?: (row: Row<T>) => JSX.Element
  className?: string
  bpTableProps: IHTMLTableProps
  hideHeaders?: boolean
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function Table<T extends object>(props: TableProps<T>): React.ReactElement {
  const { bpTableProps, className, renderCustomRow, hideHeaders } = props
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({
    columns: props.columns || [],
    data: props.data || []
  })

  return (
    <HTMLTable {...getTableProps()} interactive={true} {...bpTableProps} className={className}>
      {hideHeaders ? null : (
        <thead>
          {headerGroups.map(headerGroup => {
            const { key: rowKey, ...otherHeaderProps } = headerGroup.getHeaderGroupProps()
            return (
              <tr key={rowKey} {...otherHeaderProps}>
                {headerGroup.headers.map(column => {
                  const { key: colHeaderKey, ...otherColHeaderProps } = column.getHeaderProps()
                  return (
                    <th key={colHeaderKey} {...otherColHeaderProps} style={{ width: column.width }}>
                      {column.render('Header')}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
      )}
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          if (renderCustomRow) {
            return renderCustomRow(row)
          }
          const { key, ...otherProps } = row.getRowProps()
          return (
            <tr key={key} {...otherProps}>
              {row.cells.map((cell, index) => {
                const { key: cellKey, ...otherCellProps } = cell.getCellProps()
                return (
                  <td
                    key={cellKey}
                    {...otherCellProps}
                    style={hideHeaders ? { width: headerGroups[0]?.headers[index]?.width } : undefined}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </HTMLTable>
  )
}
