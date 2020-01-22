import React, { useState, ChangeEvent } from 'react'
import { Button } from '../Button/Button'
import { Layout } from '../../../src/layouts/Layout'
import { connect, FormikContext } from 'formik'

import css from './FieldArray.css'

export type FieldValue = any

export interface Field {
  name: string
  label: string
  defaultValue?: FieldValue
  renderer?: (
    value: FieldValue,
    rowIndex: number,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  ) => React.ReactElement
}

export type RowData = Record<string, FieldValue>

interface Props {
  fields: Field[]
  label: string
  placeholder?: string
  name: string
}

interface ConnectedProps extends Props {
  formik: FormikContext<any>
}

function FieldArray(props: ConnectedProps) {
  const { name, fields, label, placeholder, formik } = props
  /*
    Storing rows data in format:
      [
        {
          <fieldname1>: <fieldvalue1>,
          <fieldname2>: <fieldvalue2>
        }
      ]
  */
  // console.log({ formik })
  // debugger
  const [value, setValue] = useState<RowData[]>(formik.values[name] || [])

  // generate default row data from column/field data
  const defaultNewRowValue = fields.reduce((acc, { name, defaultValue = '' }) => {
    return Object.assign({}, acc, { [name]: defaultValue })
  }, {})

  function addRow() {
    setValue(rows => {
      // insert new row at begining of rows array
      const modifiedRows = [defaultNewRowValue].concat(rows)
      formik.setFieldValue(name, modifiedRows)
      return modifiedRows
    })
  }

  function deleteRow(index: number) {
    setValue(rows => {
      const modifiedRows = rows.filter((_, i) => i != index)
      formik.setFieldValue(name, modifiedRows)
      return modifiedRows
    })
  }

  function handleChange(rowIndex: number, fieldName: string, event: ChangeEvent<HTMLInputElement>) {
    setValue(rows => {
      rows[rowIndex] = { ...rows[rowIndex], [fieldName]: event.target.value }
      return rows
    })
    formik.setFieldValue(name, value)
  }

  return (
    <div className={css.container}>
      <Layout.Horizontal className={css.title}>
        <span className={css.text}>{label}</span>
        {value.length > 0 ? (
          <Button minimal text="Add" intent="primary" icon="plus" onClick={addRow} data-id={'btn-add'} />
        ) : null}
      </Layout.Horizontal>

      {value.length == 0 ? (
        <div className={css.noData}>
          {placeholder ? <div className={css.text}>{placeholder}</div> : null}
          <Button text="Add" intent="primary" icon="plus" onClick={addRow} data-id={'btn-add-no-data'} />
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
            {value.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {fields.map((field, fieldIndex) => {
                  const { name, renderer } = field
                  return (
                    <td key={`${rowIndex}-${fieldIndex}-${value.length}`}>
                      {renderer ? renderer(row[name], rowIndex, handleChange?.bind(null, rowIndex, name)) : row[name]}
                    </td>
                  )
                })}
                <td className={css.deleteColumn}>
                  <Button minimal icon="main-trash" onClick={deleteRow.bind(null, rowIndex)} data-id={'btn-delete'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default connect<Props, RowData[]>(FieldArray)
