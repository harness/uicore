/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'

import { MultiSelect } from '../static/index'
import data from './pokedex.json'
export interface MultiSelectOption {
  label: string
  value: string | number | symbol
  disabled?: boolean
}
const items: MultiSelectOption[] = data.map((row, i) => ({
  label: row.name,
  value: row.id,
  disabled: i < 3
}))

function dummyPromise(): Promise<MultiSelectOption[]> {
  return new Promise<MultiSelectOption[]>(resolve => {
    setTimeout(() => {
      resolve(items)
    }, 5000)
  })
}

export function SimpleSelect() {
  const [value, setValue] = React.useState<MultiSelectOption[]>(items.slice(0, 3))

  return (
    <MultiSelect
      items={items}
      value={value}
      onChange={items => {
        setValue(items)
      }}
    />
  )
}

export function AsyncSelect() {
  const [value, setValue] = React.useState<MultiSelectOption[]>([])

  return (
    <MultiSelect
      items={dummyPromise}
      value={value}
      onChange={items => {
        setValue(items)
      }}
    />
  )
}
