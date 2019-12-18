import React, { useState } from 'react'
import { Button } from '../Button/Button'
import { Layout } from '../../../src/layouts/Layout'

import css from './FieldArray.css'

type FieldValue = string | number

export interface Field {
  name: string
  label: string
  defaultValue: FieldValue
  renderer?: (arg0: FieldValue) => React.ReactElement
}

interface Props {
  fields: Field[]
  title: string
  noDataText?: string
}

type RowData = Record<string, FieldValue>

export function FieldArray({ fields, title, noDataText }: Props) {
  /*
    Storing rows data in format:
      {
        <fieldname1>: <fieldvalue1>,
        <fieldname2>: <fieldvalue2>
      }
  */
  const [rows, setRows] = useState<RowData[]>([])

  // generate default row data from column/field data
  const defaultNewRowValue = fields.reduce(function xyz(acc, { name, defaultValue }) {
    return Object.assign(acc, { [name]: defaultValue })
  }, {})

  function addRow() {
    // insert new row at begining of rows array
    setRows(rows => [defaultNewRowValue].concat(rows))
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
              {fields.map((field, index) => (
                <th key={index}>{field.label}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {fields.map(({ name, renderer = value => value }, fieldIndex) => (
                  <td key={fieldIndex}>{renderer(row[name])}</td>
                ))}
                <td>
                  <Button minimal icon="main-trash" onClick={deleteRow.bind(null, rowIndex)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
