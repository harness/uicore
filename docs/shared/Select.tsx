import React, { useState } from 'react'

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

export function SimpleSelect() {
  const [val, setVal] = useState()

  return <Select items={items} value={val} onChange={setVal} />
}

export function AsyncSelect() {
  const [val, setVal] = useState()
  return <Select items={dummyPromise} value={val} onChange={setVal} />
}
