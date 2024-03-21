/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { DropDown, DropDownProps, SelectOption } from '../../'

export interface SortDropdownProps extends Partial<DropDownProps> {
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
  Oldest = 'createdAt,ASC',
  StatusAsc = 'status,ASC',
  StatusDesc = 'status,DESC',
  VersionAsc = 'version,ASC',
  VersionDesc = 'version,DESC'
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

export const sortByStatus: SelectOption[] = [
  { label: 'Status (A->Z, 0->9)', value: SortMethod.StatusAsc },
  { label: 'Status (Z->A, 9->0)', value: SortMethod.StatusDesc }
]

export const sortByVersion: SelectOption[] = [
  { label: 'Version (A->Z, 0->9)', value: SortMethod.VersionAsc },
  { label: 'Version (Z->A, 9->0)', value: SortMethod.VersionDesc }
]

export function SortDropdown(props: SortDropdownProps): JSX.Element {
  const { sortOptions, onSortMethodChange, selectedSortMethod, ...rest } = props
  return (
    <DropDown
      icon={'main-sort'}
      items={sortOptions}
      onChange={onSortMethodChange}
      value={selectedSortMethod}
      filterable={false}
      {...rest}
    />
  )
}
