/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState, useContext } from 'react'
import { EditableText, Popover, PopoverInteractionKind } from '@blueprintjs/core'
import { get, isNil } from 'lodash-es'
import cx from 'classnames'
import { FormikTooltipContext } from '../FormikForm/FormikTooltipContext'

import { FormInput, TextProps } from '../FormikForm/FormikForm'
import { Text } from '../Text/Text'
import { Icon } from '@harness/icons'
import { Layout } from '../../layouts/Layout'
import { Container } from '../Container/Container'
import textCss from '../TextInput/TextInput.css'
import css from './InputWithIdentifier.css'
import { FormError } from '../FormError/FormError'

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
  if (isNil(str)) return ''

  return str
    .trim()
    .replace(/[^0-9a-zA-Z_$ ]/g, '') // remove special chars except _ and $
    .replace(/ +/g, '_') // replace spaces with _
}

export const InputWithIdentifier: React.FC<InputWithIdentifierProps> = props => {
  const {
    formik,
    inputLabel = 'Name',
    idLabel = 'Id',
    inputName = 'name',
    idName = 'identifier',
    inputGroupProps,
    isIdentifierEditable = true,
    maxInput = 63
  } = props
  const [editable, setEditable] = useState(false)
  const [userModifiedIdentifier, setUserModifiedIdentifier] = useState(false)
  const identifier = get(formik.values, idName) as string
  const [currentEditField, setCurrentEditField] = useState(inputLabel)
  const tooltipContext = useContext(FormikTooltipContext)
  const dataTooltipId = tooltipContext?.formName ? `${tooltipContext?.formName}_${idName}` : ''

  return (
    <div className={cx(css.txtNameContainer, textCss.main)}>
      <Layout.Horizontal className={css.txtIdContainer} spacing="xsmall">
        <Text
          tooltipProps={{
            dataTooltipId
          }}>
          {idLabel}
        </Text>
        <Text>:</Text>
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
              setCurrentEditField(idName)
              formik.setFieldValue(idName, getIdentifierFromName(value))
              setUserModifiedIdentifier(true)
            }}
            className={css.idValue}
          />
        </Popover>
        {isIdentifierEditable && !editable ? (
          <Icon
            name="Edit"
            size={12}
            style={{ verticalAlign: 'middle', cursor: 'pointer' }}
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
          setCurrentEditField(inputName)
          const name =
            (e.target as HTMLInputElement).value.length > maxInput
              ? formik.values[currentEditField]
              : (e.target as HTMLInputElement).value
          formik.setFieldValue(inputName, name)
          isIdentifierEditable && !userModifiedIdentifier && formik.setFieldValue(idName, getIdentifierFromName(name))
        }}
      />
      {!formik.errors[inputName] && formik.errors[idName] ? (
        <FormError name={idName} className={css.idError} errorMessage={get(formik.errors, idName)} />
      ) : null}
      {formik.values[currentEditField]?.length >= maxInput ? (
        <FormError
          name={currentEditField === idName ? idLabel : inputLabel}
          errorMessage={`Limit of ${maxInput} characters is reached for ${
            currentEditField === idName ? idLabel : inputLabel
          }`}
        />
      ) : null}
    </div>
  )
}
