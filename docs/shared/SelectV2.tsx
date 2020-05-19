import React, { useState } from 'react'

import { SelectV2, Layout, Button } from '../static/index'
import data from './pokedex.json'

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

export function SimpleSelect() {
  const [val, setVal] = useState<SelectOption>()
  return (
    <Layout.Horizontal id="primary-borderless-buttons">
      <SelectV2
        items={items}
        value={val}
        onChange={setVal}
        itemRenderer={(item, props) => (
          <Button style={{ width: '100%', display: 'block' }} minimal onClick={props.handleClick}>
            {item.label}
          </Button>
        )}>
        <Button
          intent="primary"
          minimal
          style={{ border: '1px solid var(--grey-400)', width: '100%', display: 'block' }}
          icon={val && val.icon && val.icon.name}
          rightIcon="chevron-down"
          text={val ? val.label : 'Search...'}
        />
      </SelectV2>
    </Layout.Horizontal>
  )
}
export function AsyncSelect() {
  const [val, setVal] = useState<SelectOption>()
  return (
    <Layout.Horizontal id="primary-borderless-buttons">
      <SelectV2
        items={dummyPromise}
        value={val}
        onChange={setVal}
        itemRenderer={(item, props) => (
          <Button style={{ width: '100%', display: 'block' }} minimal onClick={props.handleClick}>
            {item.label}
          </Button>
        )}>
        <Button
          intent="primary"
          minimal
          style={{ border: '1px solid var(--grey-400)', width: '100%', display: 'block' }}
          icon={val && val.icon && val.icon.name}
          rightIcon="chevron-down"
          text={val ? val.label : 'Search...'}
        />
      </SelectV2>
    </Layout.Horizontal>
  )
}
