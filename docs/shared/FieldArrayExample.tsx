import React from 'react'

import { FieldArray, TextInput } from '../static/index'

export default function FieldArrayExample() {
  const fields = [
    {
      name: 'col1',
      label: 'Column Header 1',
      defaultValue: 'a'
    },
    {
      name: 'col2',
      label: 'Column Header 2',
      defaultValue: 'b',
      renderer: value => <TextInput defaultValue={value} placeholder="Column 2 value" />
    },
    {
      name: 'col3',
      label: 'Column Header 3',
      defaultValue: 'c'
    }
  ]

  return <FieldArray fields={fields} />
}
