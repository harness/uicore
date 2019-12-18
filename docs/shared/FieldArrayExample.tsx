import React from 'react'

import { FieldArray, TextInput } from '../static/index'

export default function FieldArrayExample() {
  const fields = [
    {
      name: 'col1',
      label: 'Column Header 1',
      defaultValue: 'Item 1'
    },
    {
      name: 'col2',
      label: 'Column Header 2',
      defaultValue: 'Item 2',
      renderer: value => <TextInput defaultValue={value} placeholder="Column 2 value" />
    },
    {
      name: 'col3',
      label: 'Column Header 3',
      defaultValue: 'Item 3'
    }
  ]

  const noDataText =
    'This is a no data/add data message. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  return (
    <div style={{ width: '620px' }}>
      <FieldArray fields={fields} title="Field List" noDataText={noDataText} />
    </div>
  )
}
