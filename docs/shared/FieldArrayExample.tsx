import React from 'react'

import { FieldArray } from '../static/index'

export default function FieldArrayExample() {
  function rowRenderer(row) {
    return (
      <React.Fragment>
        <td>{row.col1}</td>
        <td>
          <input type="text" value={row.col2} />
        </td>
        <td>{row.col3}</td>
      </React.Fragment>
    )
  }

  const columns = [
    {
      name: 'col1',
      label: 'Column Header 1'
    },
    {
      name: 'col2',
      label: 'Column Header 2'
    },
    {
      name: 'col3',
      label: 'Column Header 3'
    }
  ]

  const newRowDefaultValues = {
    col1: 'a',
    col2: 'b',
    col3: 'c'
  }

  return <FieldArray columns={columns} rowRenderer={rowRenderer} newRowDefaultValues={newRowDefaultValues} />
}
