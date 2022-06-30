/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* See https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table */

import {
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedInstanceProps,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
  UsePaginationOptions,
  UsePaginationInstanceProps,
  UsePaginationState,
  UseResizeColumnsColumnProps
} from 'react-table'

export type sortType = any
export type orderType = 'ASC' | 'DESC'

interface serverSortProps {
  enableServerSort: boolean
  isServerSorted?: boolean
  isServerSortedDesc?: boolean
  getSortedColumn?: ({ sort }: { sort?: sortType }) => void
}

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseSortByOptions<D>,
      UsePaginationOptions<D>,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      Record<string, unknown> {}

  export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseColumnOrderInstanceProps<D>,
      UseExpandedInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      UseSortByInstanceProps<D> {}

  export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseColumnOrderState<D>,
      UseSortByState<D>,
      UsePaginationState<D> {}

  export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseFiltersColumnOptions<D>,
      UseSortByColumnOptions<D> {}

  export interface ColumnInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseFiltersColumnProps<D>,
      UseSortByColumnProps<D>,
      UseResizeColumnsColumnProps<D> {
    serverSortProps?: serverSortProps
  }
}
