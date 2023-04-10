/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { DropDown, SelectOption } from '../../'

export interface SortDropdownProps {
  sortOptions: SelectOption[]
  onSortMethodChange(option: SelectOption): void
  selectedSortMethod: string
}

export enum SortMethod {
  NameAsc = 'name,ASC',
  NameDesc = 'name,DESC',
  EmailAsc = 'email,ASC',
  EmailDesc = 'email,DESC',
  LastModifiedDesc = 'lastModifiedAt,DESC',
  LastUpdatedDesc = 'lastUpdatedAt,DESC',
  Newest = 'createdAt,DESC',
  Oldest = 'createdAt,ASC'
}

export const sortByName: SelectOption[] = [
  { label: 'Name (A->Z, 0->9)', value: SortMethod.NameAsc },
  { label: 'Name (Z->A, 9->0)', value: SortMethod.NameDesc }
]

export const sortByEmail: SelectOption[] = [
  { label: 'Email (A->Z, 0->9)', value: SortMethod.EmailAsc },
  { label: 'Email (Z->A, 9->0)', value: SortMethod.EmailDesc }
]

export const sortByLastModified: SelectOption[] = [{ label: 'Last Modified', value: SortMethod.LastModifiedDesc }]

export const sortByLastUpdated: SelectOption[] = [{ label: 'Last Updated', value: SortMethod.LastUpdatedDesc }]

export const sortByCreated: SelectOption[] = [
  { label: 'Newest', value: SortMethod.Newest },
  { label: 'Oldest', value: SortMethod.Oldest }
]

export function SortDropdown(props: SortDropdownProps): JSX.Element {
  return (
    <DropDown
      icon={'main-sort'}
      items={props.sortOptions}
      onChange={props.onSortMethodChange}
      value={props.selectedSortMethod}
      filterable={false}
    />
  )
}
