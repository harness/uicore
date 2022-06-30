/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import cx from 'classnames'
import { Button } from '../Button/Button'
import { Layout } from '../../../src/layouts/Layout'
import { connect, FormikContextType } from 'formik'

import css from './FieldArray.css'

export type FieldValue = any

export interface Field {
  name: string
  label: string | React.ReactElement
  defaultValue?: FieldValue
  renderer?: (
    value: FieldValue,
    rowIndex: number,
    onChange: (value: FieldValue) => void,
    error: string
  ) => React.ReactElement
}

export type RowData = Record<string, FieldValue>

interface Props {
  fields: Field[]
  label: string
  placeholder?: string
  addLabel?: string
  insertRowAtBeginning?: boolean
  name: string
  onDeleteOfRow?: (row: Record<string, FieldValue>, rowIndex: number) => Promise<boolean>
  isDeleteOfRowAllowed?: (row: Record<string, FieldValue>, rowIndex: number) => boolean
  onChange?: (params: Record<string, unknown>) => void
  labelProps?: React.HTMLAttributes<HTMLElement>
  containerProps?: React.HTMLAttributes<HTMLElement>
}

interface ConnectedProps extends Props {
  formik: FormikContextType<any>
}

function FieldArray(props: ConnectedProps) {
  const {
    name,
    fields,
    label,
    placeholder,
    formik,
    onDeleteOfRow,
    isDeleteOfRowAllowed = () => true,
    addLabel = 'Add',
    insertRowAtBeginning = true,
    onChange = () => void 0
  } = props
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
      const modifiedRows = insertRowAtBeginning ? [defaultNewRowValue].concat(rows) : rows.concat([defaultNewRowValue])
      formik.setFieldValue(name, modifiedRows)
      onChange({ modifiedRows })
      return modifiedRows
    })
  }

  async function deleteRow(index: number) {
    let canbeRemoved = true
    if (onDeleteOfRow) {
      canbeRemoved = await onDeleteOfRow(value[index], index)
    }
    if (canbeRemoved)
      setValue(rows => {
        const modifiedRows = rows.filter((_, i) => i != index)
        formik.setFieldValue(name, modifiedRows)
        const errors = (formik.errors[name] as unknown) as string[]
        if (errors?.[index]) {
          errors.splice(index, 1)
          formik.setFieldError(name, (errors as unknown) as string)
        }
        onChange({ modifiedRows })
        return modifiedRows
      })
  }

  function handleChange(rowIndex: number, fieldName: string, fieldValue: FieldValue) {
    setValue(rows => {
      rows[rowIndex] = { ...rows[rowIndex], [fieldName]: fieldValue }
      onChange({ rowIndex, fieldName, fieldValue, modifiedRows: rows })
      return rows
    })
    formik.setFieldValue(name, value)
  }

  return (
    <div {...props.containerProps} className={cx(css.container, props.containerProps?.className)}>
      <Layout.Horizontal className={css.title}>
        <span {...props.labelProps} className={cx(css.text, props.labelProps?.className)}>
          {label}
        </span>
        {value.length > 0 ? (
          <Button minimal text={addLabel} intent="primary" icon="plus" onClick={addRow} data-id={'btn-add'} />
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
                  const { name: fieldName, renderer } = field
                  return (
                    <td key={`${rowIndex}-${fieldIndex}-${value.length}`}>
                      {renderer
                        ? renderer(
                            row[fieldName],
                            rowIndex,
                            handleChange.bind(null, rowIndex, fieldName),
                            ((formik.errors[name] as unknown) as RowData[])?.[rowIndex]?.[fieldName]
                          )
                        : row[fieldName]}
                    </td>
                  )
                })}
                <td className={css.deleteColumn}>
                  {isDeleteOfRowAllowed(row, rowIndex) && (
                    <Button minimal icon="main-trash" onClick={deleteRow.bind(null, rowIndex)} data-id={'btn-delete'} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default connect<Props>(FieldArray)
