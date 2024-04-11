/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { CSSProperties, useRef } from 'react'
import { get, defaultTo } from 'lodash-es'
import { Icon } from '@harness/icons'
import { Color, FontVariation } from '@harness/design-system'
import { Text } from '../Text/Text'
import { Container } from '../Container/Container'

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  Column,
  SortingState,
  getSortedRowModel,
  VisibilityTableState,
  ColumnOrderTableState,
  ColumnPinningTableState,
  SortingTableState,
  ExpandedTableState,
  GroupingTableState,
  ColumnSizingTableState,
  PaginationTableState,
  RowSelectionTableState
} from '@tanstack/react-table'
import cx from 'classnames'

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
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0
  }
}

interface ExecutionListV2Props<Data extends Record<string, unknown>> {
  leftFixed?: string[]
  rightFixed?: string[]
  tableData: Data[]
  columns: Array<ColumnDef<unknown>>
  isSorting?: boolean
  resize?: boolean
  className?: string
  hideHeaders?: boolean
  initialState?: Partial<
    VisibilityTableState &
      ColumnOrderTableState &
      ColumnPinningTableState &
      SortingTableState &
      ExpandedTableState &
      GroupingTableState &
      ColumnSizingTableState &
      PaginationTableState &
      RowSelectionTableState
  >
  name?: string
}

const DEFAULT_EMPTY_ARR: string[] = []

export const TableV3 = <Data extends Record<string, unknown>>(
  props: ExecutionListV2Props<Data>
): React.ReactElement => {
  const containerRef = useRef(null)
  const {
    leftFixed = DEFAULT_EMPTY_ARR,
    rightFixed = DEFAULT_EMPTY_ARR,
    tableData = DEFAULT_EMPTY_ARR,
    columns = [],
    isSorting = false,
    resize = false,
    hideHeaders = false,
    initialState = {},
    name
  } = props

  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data: defaultTo(tableData, []),
    columns: columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    },
    onSortingChange: setSorting,
    initialState: {
      columnPinning: {
        left: leftFixed,
        right: rightFixed
      },
      ...initialState
    }
  })

  return (
    <div
      id="execution-table-container"
      ref={containerRef}
      style={{
        direction: table?.options?.columnResizeDirection
      }}>
      <div
        style={{
          maxWidth: defaultTo(get(containerRef, 'current.offsetWidth'), '100%')
        }}
        className={css.tableContainer}>
        <table
          {...{
            style: {
              overflowX: 'scroll',
              width: table.getCenterTotalSize()
            }
          }}>
          {hideHeaders ? null : (
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup?.id}>
                  {headerGroup.headers.map(header => {
                    const { column } = header
                    const isResizing = header.column.getIsResizing()
                    const resizeOptions = resize
                      ? {
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `${css.resizer} ${table.options.columnResizeDirection} ${cx({
                            [css.isResizing]: isResizing
                          })}`
                        }
                      : {}
                    const tooltipId = name ? `${name}${header.id}` : undefined

                    return (
                      <th
                        key={header?.id}
                        {...{
                          colSpan: header.colSpan,
                          style: {
                            width: header.getSize(),
                            ...getCommonPinningStyles(column)
                          }
                        }}
                        onClick={() => {
                          if (isSorting) {
                            header?.column?.getToggleSortingHandler()
                          }
                        }}
                        className={css.headerWrapper}>
                        {header.isPlaceholder ? null : (
                          <Container
                            className={cx({ [css.cursorPointer]: header.column.getCanSort() })}
                            onClick={header.column.getToggleSortingHandler()}
                            flex={{ justifyContent: 'flex-start' }}>
                            <Text
                              tooltipProps={{ dataTooltipId: tooltipId }}
                              font={{ size: 'normal', weight: 'bold', variation: FontVariation.TABLE_HEADERS }}
                              color={Color.GREY_800}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                            </Text>
                            <Container margin={{ left: 'small' }}>
                              {{
                                asc: <Icon name="arrow-up" size={16} />,
                                desc: <Icon name="arrow-down" size={16} />
                              }[header.column.getIsSorted() as string] ?? null}
                            </Container>
                          </Container>
                        )}
                        <div {...resizeOptions} />
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
          )}
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  const { column } = cell
                  return (
                    <td
                      key={cell?.id}
                      {...{
                        style: {
                          ...getCommonPinningStyles(column)
                        }
                      }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
