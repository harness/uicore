/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { ReactNode, useMemo } from 'react'
import { useTable, Column, Row, useSortBy, usePagination, useResizeColumns, useExpanded, TableState } from 'react-table'
import cx from 'classnames'
import { defaultTo } from 'lodash-es'
import type { IconName } from '@blueprintjs/icons'
import css from './TableV2.css'
import Pagination, { PaginationProps } from '../Pagination/Pagination'
import { Icon } from '@harness/icons'
import { Text } from '../Text/Text'
import { FontVariation } from '@harness/design-system'

export interface TableProps<Data extends Record<string, any>> {
  /**
   * Column Configuration
   */
  columns: Array<Column<Data>>
  data: Data[]
  className?: string
  /**
   * Is the table sortable?
   * @default true
   */
  sortable?: boolean
  resizable?: boolean
  hideHeaders?: boolean
  pagination?: PaginationProps
  onRowClick?: (data: Data, index: number) => void
  rowDataTestID?: (data: Data, index: number) => string
  getRowClassName?: (row: Row<Data>) => string
  /**
   * Removes the "card" UI from rows
   * @default false
   */
  minimal?: boolean
  /**
   * name - Unique identifier
   */
  name?: string
  renderRowSubComponent?: (data: { row: Row<Data> }) => ReactNode
  /**
   * When true, the expanded state will automatically reset if any of the following conditions are met:
      data is changed
   * To disable, set to false
      https://react-table-v7.tanstack.com/docs/api/useExpanded#table-options
   * @default true
   */
  autoResetExpanded?: boolean
  autoResetSortBy?: boolean
  autoResetPage?: boolean
  initialState?: Partial<TableState<Data>>
  /**
   * maxTableWidth is required, when using resizable
   */
  maxTableWidth?: number | string
}

type ColumnProperty = string | number

function convertColumnWidth(columnProperty: ColumnProperty, tableWidth: number): number {
  if (typeof columnProperty === 'string' && columnProperty.endsWith('%')) {
    // If the column property is a percentage, calculate the relative width
    const percentage = parseFloat(columnProperty)
    return (percentage / 100) * tableWidth
  } else if (typeof columnProperty === 'number') {
    // If the column property is a number, use it as is
    return columnProperty
  } else if (typeof columnProperty === 'string' && columnProperty.endsWith('px')) {
    // If the column property is in pixels, convert it to a number
    return parseInt(columnProperty)
  } else {
    // If the column property is not recognized, return a default value
    return 0
  }
}

const columnRelativeWidthParser = (column: Array<Column<any>>, tableWidth?: number): Array<Column<any>> => {
  if (tableWidth) {
    return column.map(i => {
      return { ...i, width: i.width ? convertColumnWidth(i.width, tableWidth) : i.width }
    })
  }
  return column
}

export const TableV2 = <Data extends Record<string, any>>(props: TableProps<Data>): React.ReactElement => {
  const {
    columns,
    data,
    className,
    sortable = false,
    resizable = false,
    hideHeaders = false,
    autoResetExpanded = true,
    pagination,
    rowDataTestID,
    getRowClassName,
    name,
    renderRowSubComponent,
    autoResetSortBy = true,
    autoResetPage = true,
    initialState = {},
    maxTableWidth
  } = props

  const tableRef = React.useRef<HTMLDivElement>(null)
  const [tableWidth, setTableWidth] = React.useState<number>()

  React.useEffect(() => {
    const onResize = (): void => {
      if (tableRef?.current) {
        setTableWidth(tableRef.current.clientWidth)
      }
    }
    if (resizable) {
      onResize()
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const { headerGroups, page, prepareRow } = useTable(
    {
      columns: useMemo(() => (resizable ? columnRelativeWidthParser(columns, tableWidth) : columns), [
        tableWidth,
        columns
      ]),
      data,
      initialState: { pageIndex: defaultTo(pagination?.pageIndex, 0), ...initialState },
      manualPagination: true,
      pageCount: defaultTo(pagination?.pageCount, -1),
      autoResetExpanded,
      autoResetSortBy: autoResetSortBy,
      autoResetPage: autoResetPage
    },
    useSortBy,
    useExpanded,
    usePagination,
    useResizeColumns
  )

  const getIconName = ({
    isSorted,
    isSortedDesc = false,
    isServerSorted,
    isServerSortedDesc
  }: {
    isSorted: boolean
    isSortedDesc?: boolean
    isServerSorted?: boolean
    isServerSortedDesc?: boolean
  }): IconName => {
    if ((isSorted && isSortedDesc) || (isServerSorted && isServerSortedDesc)) {
      return 'caret-up'
    }

    if (isSorted || isServerSorted) {
      return 'caret-down'
    }

    return 'double-caret-vertical'
  }

  return (
    <div className={cx(css.table, className)} ref={tableRef} style={{ maxWidth: maxTableWidth }}>
      {hideHeaders
        ? null
        : headerGroups.map(headerGroup => {
            return (
              // react key is not needed since it's generated/added by `react-table`
              // via the getHeaderGroupProps() function
              // eslint-disable-next-line react/jsx-key
              <div
                {...headerGroup.getHeaderGroupProps()}
                className={cx(css.header, { [css.minimal]: !!props.minimal })}>
                {headerGroup.headers.map(header => {
                  const label = header.render('Header')
                  const tooltipId = name ? name + header.id : undefined
                  const serverSideSort = header?.serverSortProps?.enableServerSort
                    ? {
                        onClick: () => {
                          header.serverSortProps?.getSortedColumn?.({ sort: header.id })
                        }
                      }
                    : {}
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div
                      {...header.getHeaderProps(sortable ? header.getSortByToggleProps() : void 0)}
                      {...header.getHeaderProps(resizable ? header.getHeaderProps() : void 0)}
                      className={cx(css.cell, { [css.sortable]: sortable }, { [css.resizable]: resizable })}
                      style={{ width: header.width, minWidth: header?.minWidth, maxWidth: header?.maxWidth }}
                      {...serverSideSort}>
                      <Text
                        font={{ variation: FontVariation.TABLE_HEADERS }}
                        tooltipProps={{ dataTooltipId: tooltipId }}>
                        {label}
                      </Text>
                      {sortable && header.canSort ? (
                        <Icon
                          name={getIconName({
                            isSorted: header.isSorted,
                            isSortedDesc: header.isSortedDesc,
                            isServerSorted: header.serverSortProps?.isServerSorted,
                            isServerSortedDesc: header.serverSortProps?.isServerSortedDesc
                          })}
                          size={15}
                          padding={{ left: 'small' }}
                        />
                      ) : null}
                      {resizable && <div {...header.getResizerProps()} className={css.resizer} />}
                    </div>
                  )
                })}
              </div>
            )
          })}
      <div className={css.body}>
        {page.map(row => {
          prepareRow(row)
          return (
            // eslint-disable-next-line react/jsx-key
            <div
              className={cx(
                css.row,
                {
                  [css.card]: !props.minimal,
                  [css.minimal]: !!props.minimal,
                  [css.clickable]: !!props.onRowClick
                },
                getRowClassName?.(row)
              )}
              {...row.getRowProps()}
              data-testid={rowDataTestID?.(row.original, row.index)}
              onClick={() => {
                props.onRowClick?.(row.original, row.index)
              }}>
              <div className={css.cells}>
                {row.cells.map((cell, index) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div
                      {...cell.getCellProps()}
                      className={css.cell}
                      style={{
                        width: headerGroups[0].headers[index].width,
                        maxWidth: headerGroups[0].headers[index]?.maxWidth,
                        minWidth: headerGroups[0].headers[index]?.minWidth
                      }}>
                      {cell.render('Cell')}
                    </div>
                  )
                })}
              </div>
              {row.isExpanded && <div className={css.rowSubComponent}>{renderRowSubComponent?.({ row })}</div>}
            </div>
          )
        })}
      </div>
      {pagination ? <Pagination className={css.pagination} {...pagination} /> : null}
    </div>
  )
}
