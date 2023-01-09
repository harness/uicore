/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { ReactNode } from 'react'
import {
  useTable,
  Column,
  Row,
  useSortBy,
  usePagination,
  useResizeColumns,
  useExpanded,
  UseSortByColumnOptions,
  UseResizeColumnsOptions
} from 'react-table'
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
  columns: Array<Column<Data> & UseSortByColumnOptions<Data> & UseResizeColumnsOptions<Data>>
  data: Data[]
  className?: string
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
}

export const TableV2 = <Data extends Record<string, any>>(props: TableProps<Data>): React.ReactElement => {
  const {
    columns,
    data,
    className,
    resizable = false,
    hideHeaders = false,
    autoResetExpanded = true,
    pagination,
    rowDataTestID,
    getRowClassName,
    name,
    renderRowSubComponent,
    autoResetSortBy = true,
    autoResetPage = true
  } = props
  const { headerGroups, page, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: defaultTo(pagination?.pageIndex, 0) },
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
    <div className={cx(css.table, className)}>
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
                {headerGroup.headers.map(column => {
                  const label = column.render('Header')
                  const tooltipId = name ? name + column.id : undefined
                  const serverSideSort = column?.serverSortProps?.enableServerSort
                    ? {
                        onClick: () => {
                          column.serverSortProps?.getSortedColumn?.({ sort: column.id })
                        }
                      }
                    : {}
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={cx(css.cell, { [css.sortable]: column.canSort, [css.resizable]: resizable })}
                      style={{ width: column.width }}
                      {...serverSideSort}>
                      <Text
                        font={{ variation: FontVariation.TABLE_HEADERS }}
                        tooltipProps={{ dataTooltipId: tooltipId }}>
                        {label}
                      </Text>
                      {column.canSort ? (
                        <Icon
                          name={getIconName({
                            isSorted: column.isSorted,
                            isSortedDesc: column.isSortedDesc,
                            isServerSorted: column.serverSortProps?.isServerSorted,
                            isServerSortedDesc: column.serverSortProps?.isServerSortedDesc
                          })}
                          size={15}
                          padding={{ left: 'small' }}
                        />
                      ) : null}
                      {resizable && <div {...column.getResizerProps()} className={css.resizer} />}
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
                      style={{ width: headerGroups[0].headers[index].width }}>
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
