import React from 'react'
import { HTMLTable, IHTMLTableProps } from '@blueprintjs/core'
import { useTable, Column } from 'react-table'

export interface TableProps<T extends object> {
  columns: Array<Column<T>>
  data: T[]
  className?: string
  bpTableProps: IHTMLTableProps
}

export function Table<T extends object>(props: TableProps<T>): React.ReactElement {
  const { bpTableProps, className } = props
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({
    columns: props.columns || [],
    data: props.data || []
  })

  return (
    <HTMLTable {...getTableProps()} interactive={true} {...bpTableProps} className={className}>
      <thead>
        {headerGroups.map(headerGroup => {
          const { key: rowKey, ...otherHeaderProps } = headerGroup.getHeaderGroupProps()
          return (
            <tr key={rowKey} {...otherHeaderProps}>
              {headerGroup.headers.map(column => {
                const { key: colHeaderKey, ...otherColHeaderProps } = column.getHeaderProps()
                return (
                  <th key={colHeaderKey} {...otherColHeaderProps}>
                    {column.render('Header')}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          const { key, ...otherProps } = row.getRowProps()
          return (
            <tr key={key} {...otherProps}>
              {row.cells.map(cell => {
                const { key: cellKey, ...otherCellProps } = cell.getCellProps()
                return (
                  <td key={cellKey} {...otherCellProps}>
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
