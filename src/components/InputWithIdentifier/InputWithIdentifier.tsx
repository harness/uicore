import React, { useState } from 'react'
import ContentEditable from 'react-contenteditable'
import cx from 'classnames'
import { get } from 'lodash'
import { FormInput } from '../FormikForm/FormikForm'
import { Text } from '../Text/Text'
import { Icon } from '../../icons/Icon'

import css from './InputWithIdentifier.css'
import { IInputGroupProps } from '@blueprintjs/core'

export interface InputWithIdentifierProps {
  formik: any
  inputGroupProps?: IInputGroupProps
  inputName?: string
  idName?: string
  inputLabel?: string
  idLabel?: string
}

export function getIdentifierFromName(str: string): string {
  return str
    .trim()
    .replace(/[^0-9a-zA-Z_$ ]/g, '') // remove special chars except _ and $
    .replace(/ +/g, '_') // replace spaces with _
}

export const InputWithIdentifier: React.FC<InputWithIdentifierProps> = props => {
  const {
    formik,
    inputLabel = 'Name',
    idLabel = 'ID',
    inputName = 'name',
    idName = 'identifier',
    inputGroupProps
  } = props
  const [editable, setEditable] = useState(false)

  return (
    <div className={css.txtNameContainer}>
      {get(formik.values, idName) ? (
        <div className={css.txtIdContainer}>
          {idLabel}:
          <ContentEditable
            html={get(formik.values, idName)}
            disabled={!editable}
            className={cx(css.idInput, { [css.editable]: editable })}
            tagName="span"
            onChange={ev => {
              formik.setFieldValue(idName, ev.target.value)
            }}
            onBlur={_ => {
              setEditable(false)
            }}
          />
          {!editable ? (
            <Icon
              name="edit"
              size={12}
              style={{ verticalAlign: 'middle' }}
              onClick={() => {
                setEditable(true)
              }}
            />
          ) : null}
        </div>
      ) : null}
      <FormInput.Text
        label={inputLabel}
        name={inputName}
        {...inputGroupProps}
        onChange={e => {
          const name = (e.target as HTMLInputElement).value
          formik.setFieldValue(idName, getIdentifierFromName(name))
        }}
      />
      {formik.errors[idName] ? (
        <Text font="small" intent="danger" padding={{ bottom: 'medium' }}>
          {get(formik.errors, idName)}
        </Text>
      ) : null}
    </div>
  )
}
