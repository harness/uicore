/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { CSSProperties } from 'react'

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  Column,
  SortingState,
  getSortedRowModel,
  ColumnPinningState,
  Row
} from '@tanstack/react-table'
import cx from 'classnames'
import Pagination, { PaginationProps } from '../Pagination/Pagination'
import css from './TableV3.css'

const getCommonPinningStyles = (column: Column<unknown>): CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right')

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
      ? '4px 0 4px -4px gray inset'
      : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0
  }
}

export interface TableV3Props<T> {
  columns: Array<ColumnDef<T, any>>
  data: T[]
  columnPinning?: ColumnPinningState
  useDynamicTableSize?: boolean
  className?: string
  pagination?: PaginationProps
  getRowClassName?: (row: Row<T>) => string | undefined
  onRowClick?: (data: T, index: number) => void
}

export function TableV3<T>(props: TableV3Props<T>) {
  const {
    data,
    columns = [],
    columnPinning = { left: [], right: [] },
    useDynamicTableSize,
    className,
    pagination,
    getRowClassName
  } = props

  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable<T>({
    data,
    columns: columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    },
    onSortingChange: setSorting,
    initialState: {
      columnPinning
    }
  })

  return (
    <>
      <table
        id="table-v3"
        className={cx(css.table, className)}
        style={{
          width: useDynamicTableSize ? table.getTotalSize() : '100%'
        }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ ...getCommonPinningStyles(header.column as any), width: header.getSize() }}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className={getRowClassName?.(row)}>
              {row.getVisibleCells().map(cell => {
                const { column } = cell
                return (
                  <td
                    key={cell.id}
                    style={{ ...getCommonPinningStyles(column as any), width: cell.column.getSize() }}
                    onClick={() => props?.onRowClick?.(row.original, row.index)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination ? <Pagination className={css.pagination} {...pagination} /> : null}
    </>
  )
}
