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
