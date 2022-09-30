/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import css from './StackedSummaryTable.css'
import { pick } from 'lodash-es'
import type { Renderer, CellProps, Column } from 'react-table'
import { PopoverProps } from '../Popover/Popover'
import { TableV2 } from '../TableV2/TableV2'
import { Utils } from '../../core/Utils'
import { NavLink } from 'react-router-dom'
import {
  getStackedSummaryBarCount,
  StackedSummaryBar,
  StackedSummaryBarData
} from '../StackedSummaryBar/StackedSummaryBar'

export interface StackedSummaryInterface extends StackedSummaryBarData {
  label: string
  labelLink?: string
  labelTooltip?: JSX.Element
  tooltipProps?: PopoverProps
}

export interface StackedSummaryTableProps {
  columnHeaders: Array<JSX.Element | string>
  columnWidth?: number[]
  summaryData: StackedSummaryInterface[]
  barLength?: number
  noDataRenderer?: () => JSX.Element
}

export const StackedSummaryTable: React.FC<StackedSummaryTableProps> = props => {
  const { columnHeaders, summaryData, barLength, noDataRenderer, columnWidth = [] } = props

  if (!summaryData[0]?.barSectionsData?.length) {
    if (noDataRenderer) {
      return noDataRenderer()
    }
    return null
  }

  const maxCount = getStackedSummaryBarCount(summaryData[0].barSectionsData)

  const RenderStackedSummaryBarLabelColumn: Renderer<CellProps<StackedSummaryInterface>> = ({ row }) => {
    const labelLink = row.original?.labelLink
    return (
      <Utils.WrapOptionalTooltip
        tooltip={row.original?.labelTooltip}
        tooltipProps={
          row.original?.tooltipProps ?? {
            isDark: true,
            fill: true,
            position: 'bottom'
          }
        }>
        {labelLink ? (
          <NavLink to={labelLink}>
            <label className={'links'}>{row.original?.label}</label>
          </NavLink>
        ) : (
          <label className={'links'}>{row.original?.label}</label>
        )}
      </Utils.WrapOptionalTooltip>
    )
  }

  const RenderStackedSummaryBarCountColumn: Renderer<CellProps<StackedSummaryInterface>> = ({ row }) => {
    return (
      <StackedSummaryBar
        maxCount={maxCount}
        barLength={barLength}
        {...pick(row.original, ['barSectionsData', 'trend', 'intent'])}></StackedSummaryBar>
    )
  }

  const columns: Array<Column<StackedSummaryInterface>> = [
    {
      Header: () => columnHeaders[0],
      accessor: 'label',
      width: columnWidth[0] || '40%',
      Cell: RenderStackedSummaryBarLabelColumn
    },
    {
      Header: () => columnHeaders[1],
      accessor: 'trend',
      width: columnWidth[1] || '60%',
      Cell: RenderStackedSummaryBarCountColumn
    }
  ]

  return (
    <TableV2<StackedSummaryInterface> columns={columns} data={summaryData} className={css.overviewSummary} minimal />
  )
}
