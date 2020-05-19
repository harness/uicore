import React, { useState } from 'react'

import { Select } from '../static/index'
import data from '../shared/pokedex.json'

interface SelectOption {
  label: string
  value: string | number | symbol
  icon?: any
}

const items: SelectOption[] = data.map(row => ({
  label: row.name,
  value: row.id,
  icon: row.icon
}))

function dummyPromise(): Promise<SelectOption[]> {
  return new Promise<SelectOption[]>(resolve => {
    setTimeout(() => {
      resolve(items)
    }, 5000)
  })
}
export function AsyncSelect() {
  const [val, setVal] = useState()
  return <Select items={dummyPromise} value={val} onChange={setVal} />
}
