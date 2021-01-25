import React, { useEffect, useRef, useState } from 'react'
import { IInputGroupProps } from '@blueprintjs/core'
import { get } from 'lodash-es'

import { FormInput } from '../FormikForm/FormikForm'
import { Text } from '../Text/Text'
import { Icon } from '../../icons/Icon'
import { Layout } from '../../layouts/Layout'

import css from './InputWithIdentifier.css'

export interface InputWithIdentifierProps {
  formik: any
  inputGroupProps?: IInputGroupProps
  /**
   * @default name
   */
  inputName?: string
  /**
   * @default identifier
   */
  idName?: string
  /**
   * @default Name
   */
  inputLabel?: string
  /**
   * @default ID
   */
  idLabel?: string
  /**
   * Should the user be allowed to edit the identifier?
   * @default true
   */
  isIdentifierEditable?: boolean
  /**
   * @default 63
   */
  maxInput?: number
}

// https://harness.atlassian.net/wiki/spaces/CDNG/pages/736200458/Entity+Identifier
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
    inputGroupProps,
    isIdentifierEditable = true,
    maxInput = 63
  } = props
  const [editable, setEditable] = useState(false)
  const [userModifiedIdentifier, setUserModifiedIdentifier] = useState(false)
  const idInputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editable) {
      idInputEl.current?.focus()
    }
  }, [editable])

  return (
    <div className={css.txtNameContainer}>
      <Layout.Horizontal className={css.txtIdContainer} spacing="xsmall">
        <Text>{idLabel}:</Text>
        {editable ? (
          <input
            name={idName}
            value={get(formik.values, idName)}
            className={css.idInput}
            ref={idInputEl}
            autoComplete="off"
            onChange={ev => {
              formik.setFieldValue(idName, getIdentifierFromName(ev.target.value.substring(0, maxInput)))
              setUserModifiedIdentifier(true)
            }}
            onBlur={() => {
              setEditable(false)
            }}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                event.preventDefault()
              }
            }}
          />
        ) : (
          <span className={css.idValue} title={get(formik.values, idName)}>
            {get(formik.values, idName)}
          </span>
        )}
        {isIdentifierEditable && !editable ? (
          <Icon
            name="edit"
            size={12}
            style={{ verticalAlign: 'middle' }}
            onClick={() => {
              setEditable(true)
            }}
          />
        ) : null}
      </Layout.Horizontal>
      <FormInput.Text
        label={inputLabel}
        name={inputName}
        {...inputGroupProps}
        onChange={e => {
          const name = (e.target as HTMLInputElement).value.substring(0, maxInput)
          formik.setFieldValue(inputName, name)
          isIdentifierEditable && !userModifiedIdentifier && formik.setFieldValue(idName, getIdentifierFromName(name))
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
