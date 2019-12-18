import React, { useState } from 'react'
import { Button } from '../Button/Button'

import css from './FieldArray.css'

export interface Column {
  name: string
  label: string
}

interface Props {
  columns: Array<Column>
  rowRenderer: (any) => React.ReactFragment
  newRowDefaultValues: object
}

export function FieldArray({ columns, rowRenderer, newRowDefaultValues }: Props) {
  const [rows, setRows] = useState<Array<object>>([])

  function addRow() {
    setRows([newRowDefaultValues].concat(rows))
  }

  function deleteRow(index: number) {
    let rowsCopy = rows.slice()
    rowsCopy.splice(index, 1)
    setRows(rowsCopy)
  }

  return (
    <div className={css.container}>
      {rows.length > 0 ? <Button minimal text="Add" intent="primary" icon="plus" onClick={addRow} /> : null}

      {rows.length == 0 ? (
        <div>
          No Data
          <br />
          <Button text="Add" intent="primary" icon="plus" onClick={addRow} />
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.label}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {rowRenderer(row)}
                <td>
                  <Button minimal icon="main-trash" onClick={deleteRow.bind(null, index)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
