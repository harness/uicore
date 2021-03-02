import React, { useState } from 'react'
import { EditableText, Popover, PopoverInteractionKind } from '@blueprintjs/core'
import { get } from 'lodash-es'

import { FormInput, TextProps } from '../FormikForm/FormikForm'
import { Text } from '../Text/Text'
import { Icon } from '../../icons/Icon'
import { Layout } from '../../layouts/Layout'
import { Container } from '../Container/Container'

import css from './InputWithIdentifier.css'

export interface InputWithIdentifierProps {
  formik: any
  inputGroupProps?: Omit<TextProps, 'name' | 'label' | 'onChange'>
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
  const identifier = get(formik.values, idName) as string

  return (
    <div className={css.txtNameContainer}>
      <Layout.Horizontal className={css.txtIdContainer} spacing="xsmall">
        <Text>{idLabel}:</Text>
        <Popover
          content={<Container padding="small">{identifier}</Container>}
          interactionKind={PopoverInteractionKind.HOVER}
          hoverOpenDelay={500}
          disabled={!identifier || identifier.length < 10}>
          <EditableText
            maxLength={maxInput}
            disabled={!isIdentifierEditable}
            placeholder=""
            minWidth={0}
            value={identifier}
            isEditing={editable}
            onConfirm={() => setEditable(false)}
            onCancel={() => setEditable(false)}
            onEdit={() => setEditable(true)}
            onChange={value => {
              formik.setFieldValue(idName, getIdentifierFromName(value))
              setUserModifiedIdentifier(true)
            }}
            className={css.idValue}
          />
        </Popover>
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
        {...inputGroupProps}
        label={inputLabel}
        name={inputName}
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
