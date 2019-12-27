import React from 'react'

import { MultiSelect, MultiSelectOption } from '../static/index'
import data from './pokedex.json'

const items: MultiSelectOption[] = data.map(row => ({
  label: row.name,
  value: row.id
}))

function dummyPromise(): Promise<MultiSelectOption[]> {
  return new Promise<MultiSelectOption[]>(resolve => {
    setTimeout(() => {
      resolve(items)
    }, 5000)
  })
}

export function SimpleSelect(_props: { useRandomValue: boolean }) {
  const [value, setValue] = React.useState<MultiSelectOption[]>([])

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

export function AsyncSelect(_props: { useRandomValue: boolean }) {
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
