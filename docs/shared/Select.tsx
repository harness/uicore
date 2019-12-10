import React from 'react'

import { Select, SelectOption } from '../static/index'
import data from '../shared/pokedex.json'

const items: SelectOption[] = data.map(row => ({
  label: row.name,
  value: row.id
}))

function dummyPromise(): Promise<SelectOption[]> {
  return new Promise<SelectOption[]>(resolve => {
    setTimeout(() => {
      resolve(items)
    }, 5000)
  })
}

export function SimpleSelect(props: { useRandomValue: boolean }) {
  return <Select items={items} value={props.useRandomValue ? items[Math.floor(Math.random() * items.length)] : null} />
}

export function AsyncSelect(props: { useRandomValue: boolean }) {
  return (
    <Select
      items={dummyPromise}
      value={props.useRandomValue ? items[Math.floor(Math.random() * items.length)] : null}
    />
  )
}
