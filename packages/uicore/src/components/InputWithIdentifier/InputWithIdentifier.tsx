/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useContext } from 'react'
import { EditableText, Popover, PopoverInteractionKind } from '@blueprintjs/core'
import { get, isNil, set, cloneDeep } from 'lodash-es'
import cx from 'classnames'
import { FormikTooltipContext } from '../FormikForm/FormikTooltipContext'

import { FormInput, TextProps } from '../FormikForm/FormikForm'
import { Text } from '../Text/Text'
import { Icon } from '@harnessio/icons'
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
   * @default 128
   */
  maxInput?: number
  /**
   * @default true
   */
  useUnversialToolTipId?: boolean
  /**
   * callback function that gets triggered when
   * identifier changes, either directly or due to changes in name field
   */
  onIdentifierChangeCallback?: (identifier: string) => void
}

// https://harness.atlassian.net/wiki/spaces/CDNG/pages/736200458/Entity+Identifier
export function getIdentifierFromName(str: string): string {
  if (isNil(str)) return ''

  return str
    .trim()
    .replace(/^[0-9-$]*/, '') // remove starting digits, dashes and $
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
    maxInput = 128,
    useUnversialToolTipId = true,
    onIdentifierChangeCallback
  } = props
  const [editable, setEditable] = useState(false)
  const [userModifiedIdentifier, setUserModifiedIdentifier] = useState(false)
  const identifier = get(formik.values, idName) as string
  const [currentEditField, setCurrentEditField] = useState(inputLabel)
  const tooltipContext = useContext(FormikTooltipContext)
  const dataTooltipId = !useUnversialToolTipId
    ? tooltipContext?.formName
      ? `${tooltipContext?.formName}_${idName}`
      : ''
    : 'universalInputNameWithId'

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
              const identifierFromName = getIdentifierFromName(value)
              setCurrentEditField(idName)
              formik.setFieldValue(idName, identifierFromName)
              setUserModifiedIdentifier(true)
              onIdentifierChangeCallback?.(identifierFromName)
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

          // formik.setFieldValue(inputName, name)
          // isIdentifierEditable && !userModifiedIdentifier && formik.setFieldValue(idName, getIdentifierFromName(name))

          const updatedValues = cloneDeep(formik.values)
          set(updatedValues, inputName, name)
          const identifierFromName = getIdentifierFromName(name)

          if (isIdentifierEditable && !userModifiedIdentifier) {
            set(updatedValues, idName, identifierFromName)
          }

          formik.setValues(updatedValues)

          // onIdentifierChangeCallback needs to be called after the above formik.setValues
          if (isIdentifierEditable && !userModifiedIdentifier) {
            onIdentifierChangeCallback?.(identifierFromName)
          }
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
