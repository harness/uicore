import React, { useState } from 'react'
import { Button } from '../Button/Button'
import { Layout } from '../../../src/layouts/Layout'

import css from './FieldArray.css'

export interface Column {
  name: string
  label: string
  defaultValue: any
  renderer?: (arg0: any) => React.ReactElement
}

interface Props {
  fields: Array<Column>
  title: string
  noDataText?: string
}

export function FieldArray({ fields, title, noDataText }: Props) {
  const [rows, setRows] = useState<Array<Record<string, any>>>([])

  function addRow() {
    setRows(rows =>
      [
        fields.reduce(function xyz(acc, { name, defaultValue }) {
          return Object.assign(acc, { [name]: defaultValue })
        }, {})
      ].concat(rows)
    )
  }

  function deleteRow(index: number) {
    setRows(rows => rows.filter((_, i) => i != index))
  }

  return (
    <div className={css.container}>
      <Layout.Horizontal className={css.title}>
        <span className={css.text}>{title}</span>
        {rows.length > 0 ? <Button minimal text="Add" intent="primary" icon="plus" onClick={addRow} /> : null}
      </Layout.Horizontal>

      {rows.length == 0 ? (
        <div className={css.noData}>
          {noDataText ? <div className={css.text}>{noDataText}</div> : null}
          <Button text="Add" intent="primary" icon="plus" onClick={addRow} />
        </div>
      ) : (
        <table cellSpacing={0}>
          <thead>
            <tr>
              {fields.map((column, index) => (
                <th key={index}>{column.label}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {fields.map(({ name, renderer = value => value }, index) => (
                  <td key={index}>{renderer(row[name])}</td>
                ))}
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
