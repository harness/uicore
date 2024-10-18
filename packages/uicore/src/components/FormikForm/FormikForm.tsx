/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { ReactNode, useCallback, useMemo, useState, useRef, useEffect } from 'react'
import { connect, Form as FrmForm, Formik as FrmFormik, FormikConfig, FormikHelpers, useFormikContext } from 'formik'
import {
  LoadingSelectOption,
  SelectOption,
  Select as UiKitSelect,
  SelectProps as UiKitSelectProps
} from '../Select/Select'
import {
  MultiSelect as UiKitMultiSelect,
  MultiSelectOption,
  MultiSelectProps as UiKitMultiSelectProps
} from '../MultiSelect/MultiSelect'
import { IconName, TagInput as BPTagInput, Popover, MenuItem, Menu, Position, IPopoverProps } from '@blueprintjs/core'
import { Utils } from '../../core/Utils'
import { Checkbox as UiKitCheckbox, CheckboxProps as UiKitCheckboxProps } from '../Checkbox/Checkbox'
import { Toggle as UiKitToggle, ToggleProps as UiKitToggleProps } from '../Toggle/Toggle'
import { TagInputProps as UiKitTagInputProps, TagInput as UiKitTagInput } from '../TagInput/TagInput'
import { RadioButtonGroup, RadioButtonGroupProps } from '../RadioButton/RadioButtonGroup'
import {
  FormGroup,
  InputGroup,
  IFormGroupProps,
  IInputGroupProps,
  Intent,
  ITagInputProps,
  ITextAreaProps,
  IFileInputProps,
  TextArea as BpTextArea,
  FileInput as BpFileInput,
  HTMLInputProps
} from '@blueprintjs/core'
import { defaultTo, get, isNil, omit, uniq } from 'lodash-es'
import cx from 'classnames'
import css from './FormikForm.css'
import i18n from './FormikForm.i18n'
import { OverlaySpinner } from '../OverlaySpinner/OverlaySpinner'
import { ColorPickerProps, ColorPicker } from '../ColorPicker/ColorPicker'
import {
  InputWithIdentifier,
  InputWithIdentifierProps,
  getIdentifierFromName
} from '../InputWithIdentifier/InputWithIdentifier'
import {
  MultiTypeInputProps,
  MultiTypeInput,
  MultiSelectTypeInputProps,
  MultiSelectTypeInput,
  MultiTextInputProps,
  MultiTextInput,
  getMultiTypeFromValue,
  MultiSelectWithSubmenuTypeInputProps,
  MultiSelectWithSubmenuTypeInput,
  SelectWithSubmenuTypeInputProps,
  SelectWithSubmenuTypeInputPropsV2,
  SelectWithSubmenuTypeInputV2,
  SelectWithSubmenuTypeInput,
  MultiTypeBiLevelInput,
  MultiTypeBiLevelInputProps
} from '../MultiTypeInput/MultiTypeInput'
import {
  CategorizedSelectProps,
  CategorizedSelect,
  CategorizedSelectOption
} from '../CategorizedSelected/CategorizedSelect'
import { SelectWithSubviewProps, SelectWithSubview } from '../SelectWithSubview/SelectWithSubview'
import { MultiSelectWithSubviewProps, MultiSelectWithSubview } from '../MultiSelectWithSubView/MultiSelectWithSubView'

import {
  ExpressionInputProps as ExpressionInputLocalProps,
  ExpressionInput as ExpressionInputLocal
} from '../ExpressionInput/ExpressionInput'

import { FormikTooltipContext } from './FormikTooltipContext'
import { MultiTypeInputType } from '../MultiTypeInput/MultiTypeInputUtils'
import { FormError } from '../FormError/FormError'
import { DropDown as UiKitDropDown, DropDownProps } from '../DropDown/DropDown'
import { errorCheck, getFormFieldLabel, FormikContextProps, FormikExtended, escapeNewlines } from './utils'
import { DurationInput } from './DurationInput'
import { SelectWithSubmenuOption } from '../SelectWithSubmenu/SelectWithSubmenu'
import { SubmenuSelectOption } from '../SelectWithSubmenu/SelectWithSubmenuV2'
import { SelectWithBiLevelOption } from 'components/Select/BiLevelSelect'

// const isFunction = (obj: any): boolean => typeof obj === 'function'

export const getDefaultAutoCompleteValue = (): string => 'off'

export interface TagInputProps<T> extends Omit<IFormGroupProps, 'labelFor' | 'items'> {
  name: string
  items: T[]
  labelFor: UiKitTagInputProps<T>['labelFor']
  itemFromNewTag: UiKitTagInputProps<T>['itemFromNewTag']
  tagInputProps: Omit<UiKitTagInputProps<T>, 'labelFor' | 'keyOf' | 'itemFromNewTag' | 'items' | 'onChange'>
  onChange?: UiKitTagInputProps<T>['onChange']
}

function TagInput<T>(props: TagInputProps<T> & FormikContextProps<any>) {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    items,
    label,
    labelFor,
    itemFromNewTag,
    inline = formik?.inline,
    tagInputProps,
    onChange,
    ...rest
  } = restProps

  return (
    <FormGroup
      labelFor={name}
      label={getFormFieldLabel(label, name, props)}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <UiKitTagInput
        fill={true}
        {...tagInputProps}
        itemFromNewTag={itemFromNewTag}
        keyOf={labelFor}
        labelFor={labelFor}
        readonly={disabled}
        items={items}
        selectedItems={tagInputProps?.selectedItems || get(formik?.values, name) || []}
        onChange={(selectedItems: T[], createdItems: T[], items: T[]) => {
          formik?.setFieldValue(name, selectedItems)
          onChange?.(selectedItems, createdItems, items)
        }}
      />
    </FormGroup>
  )
}

export interface KVTagInputProps extends Omit<IFormGroupProps, 'labelFor' | 'items'> {
  name: string
  tagsProps?: Partial<ITagInputProps>
  popoverProps?: Pick<IPopoverProps, 'captureDismiss'>
  isArray?: boolean
  onChange?: ITagInputProps['onChange']
}

type KVAccumulator = { [key: string]: string }

function KVTagInput(props: KVTagInputProps & FormikContextProps<any>) {
  const { formik, name, tagsProps, popoverProps = {}, isArray = false, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    label,
    ...rest
  } = restProps
  const { separator = /[,\n\r]/ } = tagsProps ?? {}
  const [mentionsType] = React.useState(`kv-tag-input-${name}`)

  let fieldValue = get(formik?.values, name)

  // Overrides fieldValue if passed by consumer
  if (tagsProps?.values) {
    fieldValue = tagsProps.values
  }

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [inputValue, setInputValue] = useState('')
  const trimmedInputValue = useMemo(() => inputValue.trim(), [inputValue])
  const showCreatePopover = !!trimmedInputValue

  const popoverContent = (
    <Menu>
      <MenuItem
        icon="add"
        active
        text={`Create "${trimmedInputValue}"`}
        onClick={() => {
          inputRef.current?.focus()

          if (!trimmedInputValue) {
            return
          }

          // Ignore `separator` if it is strictly false.
          const tagsToAdd = separator === false ? [trimmedInputValue] : trimmedInputValue.split(separator)
          const isValid = tagsProps?.onAdd?.(tagsToAdd, 'default') ?? true

          if (!isValid) {
            return
          }

          const values = isArray
            ? uniq([...(fieldValue ?? []), ...tagsToAdd])
            : tagsToAdd.reduce(
                (acc, tag) => {
                  const [k, v] = tag.split(':')
                  acc[k] = v?.trim() || ''
                  return acc
                },
                { ...(fieldValue ?? {}) }
              )

          setInputValue('')
          formik?.setFieldTouched(name, true, false)
          formik?.setFieldValue(name, values)
          props.onChange?.(values)
        }}
      />
    </Menu>
  )

  return (
    <FormGroup
      labelFor={name}
      label={getFormFieldLabel(label, name, props)}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <Popover
        position={Position.BOTTOM_LEFT}
        fill
        minimal
        disabled={disabled}
        isOpen={showCreatePopover}
        content={popoverContent}
        {...popoverProps}>
        <BPTagInput
          values={
            isArray
              ? fieldValue || []
              : Object.keys(fieldValue || {}).map(key => {
                  const value = fieldValue[key]
                  return value ? `${key}:${value}` : key
                })
          }
          onChange={(changed: unknown) => {
            const values: string[] = changed as string[]
            formik?.setFieldTouched(name, true, false)
            formik?.setFieldValue(
              name,
              isArray
                ? uniq(values)
                : values?.reduce((acc, tag) => {
                    const parts = tag.split(':')
                    acc[parts[0]] = parts[1]?.trim() || ''
                    return acc
                  }, {} as KVAccumulator) || {}
            )
            props.onChange?.(values)
          }}
          inputRef={input => {
            input?.setAttribute('data-mentions', mentionsType)
            inputRef.current = input
          }}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.keyCode === 13) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          placeholder="Type and press enter to create a tag"
          {...tagsProps}
          inputValue={inputValue}
          onInputChange={e => {
            setInputValue(e.currentTarget.value)
            tagsProps?.onInputChange?.(e)
          }}
          onAdd={(values, method) => {
            const isValid = tagsProps?.onAdd?.(values, method) ?? true

            if (isValid) {
              setInputValue('')
            }

            return isValid
          }}
        />
      </Popover>
    </FormGroup>
  )
}

export interface MultiInputProps extends Omit<IFormGroupProps, 'labelFor' | 'items'> {
  name: string
  tagsProps?: Partial<ITagInputProps>
}

function MultiInput(props: MultiInputProps & FormikContextProps<any>) {
  const { formik, name, tagsProps, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    label,
    ...rest
  } = restProps
  const [mentionsType] = React.useState(`multi-input-${name}}`)

  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <BPTagInput
        values={formik?.values[name] || []}
        onChange={values => {
          formik?.setFieldValue(name, values as string[])
        }}
        inputRef={input => {
          input?.setAttribute('data-mentions', mentionsType)
        }}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.keyCode === 13) {
            event.preventDefault()
            event.stopPropagation()
          }
        }}
        placeholder="Type and press enter to create a tag"
        {...tagsProps}
      />
    </FormGroup>
  )
}

export interface CustomRenderProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  render: (formik: FormikExtended<any>, intent: Intent, disabled?: boolean, inline?: boolean) => React.ReactNode
}

const CustomRender = (props: CustomRenderProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    label,
    render,
    ...rest
  } = restProps

  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion*/}
      {render(formik!, intent, disabled, inline)}
    </FormGroup>
  )
}

export interface FileInputProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  fileInput?: Omit<IFileInputProps, 'inputProps' | 'text' | 'buttonText'>
  inputProps?: Omit<IFileInputProps['inputProps'], 'name' | 'disabled' | 'multiple'>
  placeholder?: string
  buttonText?: string
  onChange?: React.FormEventHandler<HTMLInputElement>
  multiple?: boolean
  shouldSetFieldValue?: boolean
}

const FileInput = (props: FileInputProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    placeholder = i18n.chooseFile,
    fileInput,
    label,
    buttonText = i18n.browse,
    onChange,
    inputProps,
    multiple = false,
    shouldSetFieldValue = true,
    ...rest
  } = restProps
  const value = get(formik?.values, name)

  let text = placeholder

  if (value) {
    // multiple files
    if (Array.isArray(value) && value.length) {
      text = value.map(file => file.name).join(', ')
    }
    // single file
    if (!Array.isArray(value)) {
      text = value.name
    }
  }

  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <BpFileInput
        fill={true}
        {...fileInput}
        buttonText={buttonText}
        inputProps={{
          name,
          disabled,
          multiple,
          ...inputProps
        }}
        disabled={disabled}
        onInputChange={(e: React.FormEvent<HTMLInputElement>) => {
          if (shouldSetFieldValue) {
            formik?.setFieldValue(name, multiple ? Array.from(e.currentTarget.files || []) : e.currentTarget.files?.[0])
          }
          onChange?.(e)
        }}
        text={text}
      />
    </FormGroup>
  )
}

export interface RadioGroupProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  items: RadioButtonGroupProps['options']
  radioGroup?: Omit<RadioButtonGroupProps, 'selectedValue' | 'onChange' | 'options'>
  onChange?: RadioButtonGroupProps['onChange']
}

const RadioGroup = (props: RadioGroupProps & FormikContextProps<any>) => {
  const { formik, name } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    items = [],
    label,
    radioGroup,
    onChange,
    ...rest
  } = props

  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <RadioButtonGroup
        {...radioGroup}
        className={inline ? css.inlineRadioGroup : ''}
        name={name}
        disabled={disabled}
        selectedValue={get(formik?.values, name)}
        options={items}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          formik?.setFieldValue(name, e.currentTarget.value)
          onChange?.(e)
        }}
      />
    </FormGroup>
  )
}

export interface CheckboxProps extends UiKitCheckboxProps, Omit<IFormGroupProps, 'labelFor' | 'label'> {
  name: string
  label: string
}

const CheckBox = (props: CheckboxProps & FormikContextProps<any>) => {
  const { formik, name, label, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    onChange,
    className = '',
    ...rest
  } = restProps
  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} {...rest}>
      <UiKitCheckbox
        {...omit(rest, 'tooltipProps')}
        className={className}
        name={name}
        // eslint-disable-next-line
        // @ts-ignore
        label={getFormFieldLabel(label, name, props, css.checkBoxDocTooltipLabel)}
        inline={inline}
        disabled={disabled}
        checked={get(formik?.values, name)}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          formik?.setFieldValue(name, e.currentTarget.checked)
          onChange?.(e)
        }}
      />
    </FormGroup>
  )
}

export interface ToggleProps extends UiKitToggleProps, Omit<IFormGroupProps, 'labelFor' | 'label'> {
  name: string
  label: string
}

const Toggle = (props: ToggleProps & FormikContextProps<any>) => {
  const { formik, name, label, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    onChange,
    className = '',
    ...rest
  } = restProps
  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} {...rest}>
      <UiKitToggle
        {...omit(rest, 'tooltipProps')}
        className={className}
        name={name}
        // eslint-disable-next-line
        // @ts-ignore
        label={getFormFieldLabel(label, name, props, css.checkBoxDocTooltipLabel)}
        disabled={disabled}
        checked={get(formik?.values, name)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          formik?.setFieldValue(name, e.currentTarget.checked)
          onChange?.(e)
        }}
      />
    </FormGroup>
  )
}

export interface MultiSelectProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  items: MultiSelectOption[]
  tagInputProps?: ITagInputProps
  placeholder?: string
  multiSelectProps?: Omit<UiKitMultiSelectProps, 'items' | 'onChange' | 'value' | 'tagInputProps'>
  onChange?: UiKitMultiSelectProps['onChange']
  usePortal?: UiKitMultiSelectProps['usePortal']
  popoverClassName?: UiKitMultiSelectProps['popoverClassName']
}

const MultiSelect = (props: MultiSelectProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    items,
    label,
    inline = formik?.inline,
    tagInputProps,
    placeholder,
    onChange,
    multiSelectProps: { resetOnQuery = false, resetOnSelect = false, ...otherMultiSelectProps } = {
      resetOnQuery: false,
      resetOnSelect: false
    },
    ...rest
  } = restProps

  const formikValue = get(formik?.values, name, [])
  const autoComplete = props.autoComplete || getDefaultAutoCompleteValue()
  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <UiKitMultiSelect
        name={name}
        tagInputProps={{
          ...tagInputProps,
          inputProps: {
            autoComplete,
            name,
            placeholder
          },
          intent,
          disabled: disabled
        }}
        resetOnSelect={resetOnSelect}
        resetOnQuery={resetOnQuery}
        {...otherMultiSelectProps}
        items={items}
        value={Array.isArray(formikValue) ? formikValue : []}
        onChange={(items: MultiSelectOption[]) => {
          formik?.setFieldValue(name, items)
          onChange?.(items)
        }}
        usePortal={!!props.usePortal}
        popoverClassName={props.popoverClassName}
      />
    </FormGroup>
  )
}

export interface SelectProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  items: SelectOption[]
  placeholder?: string
  inputGroup?: Omit<IInputGroupProps, 'name' | 'value'>
  selectProps?: Omit<UiKitSelectProps, 'items' | 'onChange' | 'value'>
  onChange?: UiKitSelectProps['onChange']
  usePortal?: UiKitSelectProps['usePortal']
  value?: UiKitSelectProps['value']
  onQueryChange?: UiKitSelectProps['onQueryChange']
  addClearButton?: boolean
}

const Select = (props: SelectProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    items,
    label,
    placeholder,
    inline = formik?.inline,
    inputGroup,
    selectProps,
    onChange,
    value,
    onQueryChange,
    ...rest
  } = restProps

  const autoComplete = props.autoComplete || getDefaultAutoCompleteValue()
  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <UiKitSelect
        usePortal={!!props.usePortal}
        name={name}
        addClearBtn={props.addClearButton || false}
        inputProps={{
          ...inputGroup,
          autoComplete,
          name,
          intent,
          placeholder: Utils.getSelectComponentPlaceholder(placeholder),
          disabled: disabled
        }}
        {...selectProps}
        items={items}
        disabled={disabled}
        value={value ?? items.filter(item => item.value === get(formik?.values, name))[0]}
        onChange={(item: SelectOption) => {
          formik?.setFieldValue(name, item.value)
          onChange?.(item)
        }}
        onQueryChange={(query: string) => onQueryChange?.(query)}
      />
    </FormGroup>
  )
}

export interface DropDownFormikProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  onChange?: DropDownProps['onChange']
  items: DropDownProps['items']
  usePortal?: boolean
  addClearBtn?: boolean
  placeholder?: string
  dropDownProps?: Omit<DropDownProps, 'items' | 'onChange' | 'value'>
}

const DropDown = (props: DropDownFormikProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    items,
    addClearBtn,
    label,
    placeholder,
    inline = formik?.inline,
    onChange,
    dropDownProps,
    ...rest
  } = restProps

  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      usePortal={!!props.usePortal}
      {...rest}>
      <UiKitDropDown
        addClearBtn={addClearBtn || false}
        placeholder={placeholder}
        {...dropDownProps}
        items={items}
        disabled={disabled}
        value={get(formik?.values, name)}
        onChange={(item: SelectOption) => {
          formik?.setFieldValue(name, item.value)
          onChange?.(item)
        }}
      />
    </FormGroup>
  )
}

export interface TextProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  inputGroup?: Omit<IInputGroupProps & HTMLInputProps, 'name' | 'value' | 'onChange' | 'placeholder'>
  placeholder?: string
  onChange?: IInputGroupProps['onChange']
  isIdentifier?: boolean
  // to allow hyphen in identifier
  allowHyphen?: boolean
}

const Text = (props: TextProps & FormikContextProps<any>) => {
  const { formik, name, isIdentifier = false, allowHyphen = false, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    inputGroup,
    label,
    placeholder,
    onChange,
    ...rest
  } = restProps
  const autoComplete = props.autoComplete || getDefaultAutoCompleteValue()
  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <InputGroup
        autoComplete={autoComplete}
        {...inputGroup}
        name={name}
        placeholder={placeholder}
        intent={intent}
        disabled={disabled}
        value={get(formik?.values, name, '')}
        onBlur={e => {
          formik?.setFieldTouched(name, true, false)
          inputGroup?.onBlur?.(e)
        }}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          if (isIdentifier) {
            const identifier = getIdentifierFromName(e.currentTarget.value, allowHyphen)
            formik?.setFieldValue(name, identifier)
          } else {
            if (inputGroup?.type === 'number') {
              formik?.setFieldValue(name, parseFloat(e.currentTarget.value))
            } else {
              formik?.setFieldValue(name, e.currentTarget.value)
            }
          }
          onChange?.(e)
        }}
      />
    </FormGroup>
  )
}

export interface ExpressionInputProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  placeholder?: string
  expressionInputProps?: Omit<ExpressionInputLocalProps, 'name' | 'value' | 'onChange' | 'items'>
  onChange?: ExpressionInputLocalProps['onChange']
  items?: ExpressionInputLocalProps['items']
}

const ExpressionInput = (props: ExpressionInputProps & FormikContextProps<any>) => {
  const { formik, name, items = [], placeholder, expressionInputProps, onChange, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    label,
    inline = formik?.inline,
    ...rest
  } = restProps

  const autoComplete = props.autoComplete || getDefaultAutoCompleteValue()
  return (
    <FormGroup
      labelFor={name}
      label={getFormFieldLabel(label, name, props)}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <ExpressionInputLocal
        name={name}
        {...expressionInputProps}
        items={items}
        autoComplete={autoComplete}
        inputProps={{ ...(expressionInputProps?.inputProps || {}), placeholder }}
        value={get(formik?.values, name)}
        onChange={(str: string) => {
          formik?.setFieldValue(name, str)
          onChange?.(str)
        }}
      />
    </FormGroup>
  )
}
export interface TextAreaProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  placeholder?: string
  autoFocus?: boolean
  textArea?: Omit<ITextAreaProps, 'name' | 'value' | 'onChange'>
  onChange?: ITextAreaProps['onChange']
  maxLength?: number
}

const TextArea = (props: TextAreaProps & FormikContextProps<any>) => {
  const { formik, name, autoFocus, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    placeholder,
    label,
    textArea,
    onChange,
    maxLength = 1024,
    ...rest
  } = restProps

  const autoComplete = props.autoComplete || getDefaultAutoCompleteValue()
  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <BpTextArea
        fill={true}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        maxLength={maxLength}
        {...textArea}
        name={name}
        intent={intent}
        disabled={disabled}
        placeholder={placeholder}
        onBlur={() => formik?.setFieldTouched(name, true, false)}
        value={get(formik?.values, name) ?? ''}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          formik?.setFieldValue(name, e.currentTarget.value)
          onChange?.(e)
        }}
      />
    </FormGroup>
  )
}

export interface FormikFormProps extends Omit<HTMLFormElement, 'className'> {
  className?: string
  disabled?: boolean
  children: React.ReactNode
  formik?: FormikExtended<any>
  [Symbol.iterator]?(): IterableIterator<Element>
}

const Form = (props: FormikFormProps) => {
  const formElementRef = React.useRef<HTMLDivElement>(null)
  React.useLayoutEffect(() => {
    if (formElementRef?.current?.childElementCount) {
      const formGroupElements = formElementRef?.current?.querySelectorAll('.bp3-form-group')
      formGroupElements?.forEach((element, index) => {
        const name =
          element.querySelector('[name]')?.getAttribute('name') ||
          element.querySelector('.bp3-label')?.getAttribute('for')
        element.setAttribute('data-id', `${name}-${index}`)
      })
    }
  }, [formElementRef])
  const { className = '', disabled = false, inline = false, children, formik, ...rest } = props
  if (formik) {
    formik.disabled = disabled
    formik.inline = inline
  }
  return (
    <FrmForm {...rest} className={cx(css.main, className)}>
      <div ref={formElementRef}>{children}</div>
    </FrmForm>
  )
}

export interface FormikProps<Values> extends Omit<FormikConfig<Values>, 'onSubmit' | 'render'> {
  formLoading?: boolean
  onSubmit: (values: Values, formikActions: FormikHelpers<Values>) => void | Promise<void> | Promise<Values>
  formName: string
}

export function Formik<Values = Record<string, unknown>>(props: FormikProps<Values>): React.ReactElement {
  const { formLoading = false, onSubmit, children, ...rest } = props
  const [isFormLoading, setFormLoading] = React.useState(false)
  React.useEffect(() => {
    setFormLoading(formLoading)
  }, [formLoading])

  const onSubmitLocal = React.useCallback(
    (values: Values, formikActions: FormikHelpers<Values>) => {
      const response = onSubmit(values, formikActions)
      if (response instanceof Promise) {
        setFormLoading(true)
        response.finally(() => {
          setFormLoading(false)
        })
      }
    },
    [onSubmit]
  )

  return (
    <FormikTooltipContext.Provider value={{ formName: props.formName }}>
      <FrmFormik {...rest} onSubmit={onSubmitLocal}>
        {formikProps => {
          return (
            <OverlaySpinner show={isFormLoading}>
              {typeof children === 'function' ? children(formikProps) : children}
            </OverlaySpinner>
          )
        }}
      </FrmFormik>
    </FormikTooltipContext.Provider>
  )
}

export interface FormColorPickerProps extends ColorPickerProps, Omit<IFormGroupProps, 'labelFor' | 'label'> {
  name: string
  label: string
}

const FormColorPicker = (props: FormColorPickerProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    onChange,
    label,
    ...rest
  } = restProps
  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      {...rest}>
      <ColorPicker
        height={38}
        color={get(formik?.values, name)}
        {...rest}
        onChange={(color: string) => {
          formik?.setFieldValue(name, color)
          onChange?.(color)
        }}
      />
    </FormGroup>
  )
}

type FetchSelectOptions = () => Promise<SelectOption[]>

export interface FormMultiTypeInputProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: string
  placeholder?: string
  /**
   *Enable this when we want to use value, instead of label/value
   */
  useValue?: boolean
  selectItems: SelectOption[] | FetchSelectOptions
  multiTypeInputProps?: Omit<MultiTypeInputProps, 'name'>
  disabled?: boolean
}

const isFetchSelectOptionsFunction = (fn: unknown): fn is FetchSelectOptions => {
  return typeof fn === 'function'
}

const FormMultiTypeInput = (props: FormMultiTypeInputProps & FormikContextProps<any>) => {
  const { formik, name, useValue = false, placeholder, multiTypeInputProps, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    label,
    ...rest
  } = restProps
  const [currentType, setCurrentType] = React.useState(getMultiTypeFromValue(get(formik?.values, name, '')))
  const [items, setItems] = useState<SelectOption[]>(
    Array.isArray(props.selectItems) ? props.selectItems : [LoadingSelectOption] // Required, otherwise dropdown shows "No results found" even before the api call is made
  )
  const [loading, setLoading] = useState<boolean>(false)
  const fetchPromiseRef = useRef<Promise<SelectOption[]> | null>(null)
  const isAsyncSelect = isFetchSelectOptionsFunction(props.selectItems)

  useEffect(() => {
    if (Array.isArray(props.selectItems)) {
      setItems(props.selectItems)
    }
  }, [props.selectItems])

  const onChangeCallback: MultiTypeInputProps['onChange'] = useCallback(
    (val, valueType, type) => {
      type !== currentType && setCurrentType(type)
      if (useValue && type === MultiTypeInputType.FIXED) {
        formik?.setFieldValue(name, val?.value)
      } else {
        formik?.setFieldValue(name, val)
      }
      formik?.setFieldTouched(name, true, false)
      multiTypeInputProps?.onChange?.(val, valueType, type)
    },
    [formik, multiTypeInputProps]
  )

  let value = get(formik?.values, name) // formik form value
  if (useValue && currentType === MultiTypeInputType.FIXED) {
    const selectedItem = items.find(item => item.value === value)
    if (isNil(selectedItem) && multiTypeInputProps?.selectProps?.allowCreatingNewItems) {
      // If allow creating custom value is true
      value = {
        label: value,
        value: value
      }
    } else if (isNil(value)) {
      value = ''
    } else {
      value = {
        label: selectedItem?.label,
        value: selectedItem?.value
      }
    }
  }

  const fetchItems = useCallback((): void => {
    if (!fetchPromiseRef.current) {
      if (typeof props.selectItems === 'function') {
        setLoading(true)
        fetchPromiseRef.current = props.selectItems()
        fetchPromiseRef.current
          .then(results => {
            setItems(results)
            setLoading(false)
          })
          .catch(() => {
            setLoading(false)
          })
      }
    }
  }, [fetchPromiseRef.current])

  const autoComplete = props.autoComplete || getDefaultAutoCompleteValue()
  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      {...rest}>
      <MultiTypeInput
        {...multiTypeInputProps}
        value={value}
        name={name}
        disabled={disabled}
        selectProps={{
          items,
          ...(isAsyncSelect ? { ...multiTypeInputProps?.selectProps, items } : multiTypeInputProps?.selectProps),
          name,
          inputProps: {
            name,
            autoComplete,
            intent,
            placeholder,
            disabled
          },
          loadingItems: loading
        }}
        onChange={onChangeCallback}
        onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
          multiTypeInputProps?.onFocus?.(event)
          if (isAsyncSelect) {
            fetchItems()
          }
        }}
      />
    </FormGroup>
  )
}
export interface FormMultiTypeBiLevelInputProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: string
  placeholder?: string
  value?: SelectWithBiLevelOption
  /**
   *Enable this when we want to use value, instead of label/value
   */
  useValue?: boolean
  selectItems: SelectWithBiLevelOption[]
  parentIcon?: IconName
  childIcon?: IconName
  multiTypeInputProps?: Omit<MultiTypeInputProps, 'name'>
  disabled?: boolean
}

const FormMultiTypeBiLevelInput = (props: FormMultiTypeBiLevelInputProps & FormikContextProps<any>) => {
  const { formik, name, useValue = false, selectItems, placeholder, multiTypeInputProps, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    label,
    ...rest
  } = restProps
  const [currentType, setCurrentType] = React.useState(getMultiTypeFromValue(get(formik?.values, name, '')))
  const onChangeCallback: MultiTypeBiLevelInputProps['onChange'] = useCallback(
    (val, valueType, type) => {
      type !== currentType && setCurrentType(type)
      if (useValue && type === MultiTypeInputType.FIXED) {
        formik?.setFieldValue(name, val?.value)
      } else {
        formik?.setFieldValue(name, val)
      }
      formik?.setFieldTouched(name, true, false)
      multiTypeInputProps?.onChange?.(val, valueType, type)
    },
    [formik, multiTypeInputProps]
  )

  let value = props?.value || get(formik?.values, name) // formik form value
  if (useValue && currentType === MultiTypeInputType.FIXED) {
    const selectedItem = selectItems.find(item => item.value === value)
    if (isNil(selectedItem) && multiTypeInputProps?.selectProps?.allowCreatingNewItems) {
      // If allow creating custom value is true
      value = {
        label: value,
        value: value
      }
    } else if (isNil(value)) {
      value = ''
    } else {
      value = {
        label: selectedItem?.label,
        value: selectedItem?.value
      }
    }
  }

  const autoComplete = props.autoComplete || getDefaultAutoCompleteValue()
  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      {...rest}>
      <MultiTypeBiLevelInput
        {...multiTypeInputProps}
        value={value}
        name={name}
        disabled={disabled}
        selectProps={{
          items: selectItems,
          ...multiTypeInputProps?.selectProps,
          name,
          inputProps: {
            name,
            autoComplete,
            intent,
            placeholder,
            disabled
          }
        }}
        onChange={onChangeCallback}
      />
    </FormGroup>
  )
}

export interface FormMultiSelectTypeInputProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: string
  placeholder?: string
  /**
   *Enable this when we want to use value, instead of label/value
   */
  useValue?: boolean
  selectItems: MultiSelectOption[]
  multiSelectTypeInputProps?: Omit<MultiSelectTypeInputProps, 'name'>
  disabled?: boolean
}

const FormMultiSelectTypeInput = (props: FormMultiSelectTypeInputProps & FormikContextProps<any>) => {
  const { formik, name, selectItems, useValue = false, placeholder, multiSelectTypeInputProps, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    label,
    ...rest
  } = restProps
  const autoComplete = props.autoComplete || getDefaultAutoCompleteValue()

  let value = get(formik?.values, name)
  if (useValue && getMultiTypeFromValue(value) === MultiTypeInputType.FIXED) {
    value = Array.isArray(value) ? selectItems.filter(item => value.includes(item.value)) : []
  }

  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      {...rest}>
      <MultiSelectTypeInput
        {...multiSelectTypeInputProps}
        disabled={disabled}
        value={value}
        name={name}
        multiSelectProps={{
          ...multiSelectTypeInputProps?.multiSelectProps,
          tagInputProps: {
            ...multiSelectTypeInputProps?.multiSelectProps?.tagInputProps,
            inputProps: {
              name,
              placeholder,
              autoComplete
            },
            intent,
            disabled: disabled
          },
          items: selectItems
        }}
        onChange={(value, valueType, type) => {
          if (useValue && type === MultiTypeInputType.FIXED) {
            formik?.setFieldValue(
              name,
              ((value as unknown) as SelectOption[]).map(item => item.value)
            )
          } else {
            formik?.setFieldValue(name, value)
          }
          formik?.setFieldTouched(name, true, false)
          multiSelectTypeInputProps?.onChange?.(value, valueType, type)
        }}
      />
    </FormGroup>
  )
}

export interface FormSelectWithSubmenuTypeInputProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: string
  placeholder?: string
  value?: SelectWithSubmenuOption
  /**
   *Enable this when we want to use value, instead of label/value
   */
  useValue?: boolean
  selectItems: SelectWithSubmenuOption[]
  selectWithSubmenuTypeInputProps?: Omit<SelectWithSubmenuTypeInputProps, 'name'>
  disabled?: boolean
}

export interface FormSelectWithSubmenuTypeInputPropsV2 extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: string
  placeholder?: string
  value?: SubmenuSelectOption
  /**
   *Enable this when we want to use value, instead of label/value
   */
  useValue?: boolean
  selectItems: SubmenuSelectOption[]
  selectWithSubmenuTypeInputProps?: Omit<SelectWithSubmenuTypeInputPropsV2, 'name'>
  disabled?: boolean
}

const FormSelectWithSubmenuTypeInput = (props: FormSelectWithSubmenuTypeInputProps & FormikContextProps<any>) => {
  const {
    formik,
    name,
    useValue = false,
    selectItems,
    placeholder,
    selectWithSubmenuTypeInputProps,
    ...restProps
  } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    label,
    ...rest
  } = restProps
  const [currentType, setCurrentType] = React.useState(getMultiTypeFromValue(get(formik?.values, name, '')))
  const onChangeCallback: SelectWithSubmenuTypeInputProps['onChange'] = useCallback(
    (val, type) => {
      type !== currentType && setCurrentType(type)
      if (useValue && type === MultiTypeInputType.FIXED) {
        formik?.setFieldValue(name, val?.value)
      } else {
        formik?.setFieldValue(name, val)
      }
      formik?.setFieldTouched(name, true, false)
      selectWithSubmenuTypeInputProps?.selectWithSubmenuProps?.onChange?.(val)
    },
    [formik, selectWithSubmenuTypeInputProps]
  )

  let value = props?.value || get(formik?.values, name) // formik form value
  if (useValue && currentType === MultiTypeInputType.FIXED) {
    const selectedItem = selectItems.find(item => item.value === value)
    if (isNil(value)) {
      value = ''
    } else {
      value = {
        label: selectedItem?.label,
        value: selectedItem?.value
      }
    }
  }

  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      {...rest}>
      <SelectWithSubmenuTypeInput
        {...selectWithSubmenuTypeInputProps}
        value={value}
        name={name}
        disabled={disabled}
        selectWithSubmenuProps={{
          items: selectItems,
          ...selectWithSubmenuTypeInputProps?.selectWithSubmenuProps,
          inputProps: {
            name,
            intent,
            placeholder,
            disabled
          }
        }}
        onChange={onChangeCallback}
      />
    </FormGroup>
  )
}

/**
 * @deprecated use SelectWithSubmenu instead. This will be removed soon
 */
const FormSelectWithSubmenuTypeInputV2 = (props: FormSelectWithSubmenuTypeInputPropsV2 & FormikContextProps<any>) => {
  const {
    formik,
    name,
    useValue = false,
    selectItems,
    placeholder,
    selectWithSubmenuTypeInputProps,
    ...restProps
  } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    label,
    ...rest
  } = restProps
  const [currentType, setCurrentType] = React.useState(getMultiTypeFromValue(get(formik?.values, name, '')))
  const onChangeCallback: SelectWithSubmenuTypeInputPropsV2['onChange'] = useCallback(
    (val, valueType, type) => {
      type !== currentType && setCurrentType(type)
      if (useValue && type === MultiTypeInputType.FIXED) {
        formik?.setFieldValue(name, val?.value)
      } else {
        formik?.setFieldValue(name, val)
      }
      formik?.setFieldTouched(name, true, false)
      selectWithSubmenuTypeInputProps?.selectWithSubmenuProps?.onChange?.(val, valueType, type)
    },
    [formik, selectWithSubmenuTypeInputProps]
  )

  let value = props?.value || get(formik?.values, name) // formik form value
  if (useValue && currentType === MultiTypeInputType.FIXED) {
    const selectedItem = selectItems.find(item => item.value === value)
    if (isNil(value)) {
      value = ''
    } else {
      value = {
        label: selectedItem?.label,
        value: selectedItem?.value
      }
    }
  }

  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      {...rest}>
      <SelectWithSubmenuTypeInputV2
        {...selectWithSubmenuTypeInputProps}
        value={value}
        name={name}
        disabled={disabled}
        selectWithSubmenuProps={{
          items: selectItems,
          ...selectWithSubmenuTypeInputProps?.selectWithSubmenuProps,
          name,
          inputProps: {
            name,
            intent,
            placeholder,
            disabled
          }
        }}
        onChange={onChangeCallback}
      />
    </FormGroup>
  )
}

export interface FormMultiSelectWithSubmenuTypeInputProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: string
  placeholder?: string
  multiSelectWithSubmenuTypeInputProps?: Omit<MultiSelectWithSubmenuTypeInputProps, 'name'>
  disabled?: boolean
}

const FormMultiSelectWithSubmenuTypeInput = (
  props: FormMultiSelectWithSubmenuTypeInputProps & FormikContextProps<any>
) => {
  const { formik, name, placeholder, multiSelectWithSubmenuTypeInputProps, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    label,
    ...rest
  } = restProps
  const onChangeCallback: SelectWithSubmenuTypeInputPropsV2['onChange'] = useCallback(
    val => {
      formik?.setFieldValue(name, val)
      formik?.setFieldTouched(name, true, false)
      multiSelectWithSubmenuTypeInputProps?.multiSelectWithSubmenuProps?.onChange?.(val)
    },
    [formik, multiSelectWithSubmenuTypeInputProps]
  )

  const value = get(formik?.values, name) // formik form value
  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      {...rest}>
      <MultiSelectWithSubmenuTypeInput
        {...multiSelectWithSubmenuTypeInputProps}
        disabled={disabled}
        value={value}
        name={name}
        multiSelectWithSubmenuProps={{
          ...multiSelectWithSubmenuTypeInputProps?.multiSelectWithSubmenuProps,
          items: defaultTo(multiSelectWithSubmenuTypeInputProps?.multiSelectWithSubmenuProps?.items, []),
          placeholder: placeholder,
          tagInputProps: {
            ...multiSelectWithSubmenuTypeInputProps?.multiSelectWithSubmenuProps?.tagInputProps,
            intent
          }
        }}
        onChange={onChangeCallback}
      />
    </FormGroup>
  )
}

export interface FormMultiTextTypeInputProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: ReactNode | string
  placeholder?: string
  onChange?: MultiTextInputProps['onChange']
  multiTextInputProps?: Omit<MultiTextInputProps, 'name'> /* In case you really want to customize the text input */
  disabled?: boolean
}

const FormMultiTextTypeInput = (props: FormMultiTextTypeInputProps & FormikContextProps<any>) => {
  const { formik, name, placeholder, multiTextInputProps, onChange, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    label,
    ...rest
  } = restProps
  const _value = get(formik?.values, name, '')
  const value = escapeNewlines(_value)
  const valueType = getMultiTypeFromValue(value)
  const customTextInputProps: Omit<IInputGroupProps & HTMLInputProps, 'onChange' | 'value'> = useMemo(
    () => ({
      ...multiTextInputProps?.textProps,
      name,
      value,
      placeholder,
      onBlur: () => formik?.setFieldTouched(name, true, false),
      ...(valueType !== MultiTypeInputType.FIXED ? { type: 'text' } : {}) // set type text of input and expressions
    }),
    [multiTextInputProps?.textProps, valueType]
  )

  const autoComplete = props.autoComplete || getDefaultAutoCompleteValue()
  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      {...rest}>
      <MultiTextInput
        value={value}
        {...multiTextInputProps}
        disabled={disabled}
        textProps={{ ...customTextInputProps, autoComplete }}
        name={name}
        onChange={(valueChange, valueType, type) => {
          let valueToBePassed = valueChange
          const inputFieldType = multiTextInputProps?.textProps?.type
          if (
            inputFieldType === 'number' &&
            valueChange &&
            typeof valueChange === 'string' &&
            type === MultiTypeInputType.FIXED
          ) {
            // if the type is a number, propagate the value as a number and type is Fixed
            valueToBePassed = parseFloat(valueChange)
          }
          formik?.setFieldValue(name, valueToBePassed)
          onChange?.(valueToBePassed, valueType, type)
        }}
      />
    </FormGroup>
  )
}

export interface FormCategorizedSelect extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: string
  placeholder?: string
  items: CategorizedSelectOption[]
  onChange?: UiKitSelectProps['onChange']
  categorizedSelectProps?: CategorizedSelectProps
}

const FormCategorizedSelect = (props: FormCategorizedSelect & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    items = [],
    label,
    placeholder,
    inline = formik?.inline,
    categorizedSelectProps,
    onChange,
    ...rest
  } = restProps

  const value = get(formik?.values, name)
  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <CategorizedSelect
        {...categorizedSelectProps}
        selectProps={{
          ...categorizedSelectProps?.selectProps,
          disabled,
          name,
          inputProps: {
            ...categorizedSelectProps?.selectProps?.inputProps,
            placeholder
          }
        }}
        items={items}
        value={value}
        onChange={(item: CategorizedSelectOption) => {
          formik?.setFieldValue(name, item.value)
          onChange?.(item)
        }}
      />
    </FormGroup>
  )
}

export interface FormSelectWithSubviewProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: string
  placeholder?: string
  items: SelectOption[]
  changeViewButtonLabel: string
  subview: SelectWithSubviewProps['subview']
  onChange?: UiKitSelectProps['onChange']
  selectWithSubviewProps?: Omit<SelectWithSubviewProps, 'items' | 'subview' | 'onChange' | 'changeViewButtonLabel'>
}

const FormSelectWithSubview = (props: FormSelectWithSubviewProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    items = [],
    label,
    placeholder,
    inline = formik?.inline,
    selectWithSubviewProps,
    changeViewButtonLabel,
    subview,
    onChange,
    ...rest
  } = restProps

  const value = get(formik?.values, name)
  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <SelectWithSubview
        {...selectWithSubviewProps}
        subview={subview}
        name={name}
        changeViewButtonLabel={changeViewButtonLabel}
        disabled={disabled}
        key={items?.[0]?.label}
        inputProps={{
          placeholder,
          onBlur: () => formik?.setFieldTouched(name, true, false)
        }}
        items={items}
        value={items.find(item => item?.value === value)}
        onChange={(item: SelectOption, e) => {
          formik?.setFieldValue(name, item.value)
          onChange?.(item, e)
        }}
      />
    </FormGroup>
  )
}

export interface FormMultiSelectWithSubviewProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: string
  placeholder?: string
  items: MultiSelectOption[]
  changeViewButtonLabel: string
  subview: MultiSelectWithSubviewProps['subview']
  onChange?: MultiSelectProps['onChange']
  multiSelectWithSubviewProps?: Omit<
    MultiSelectWithSubviewProps,
    'items' | 'subview' | 'onChange' | 'changeViewButtonLabel'
  >
  disabled?: boolean
}

const FormMultiSelectWithSubview = (props: FormMultiSelectWithSubviewProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    items = [],
    placeholder,
    label,
    inline = formik?.inline,
    multiSelectWithSubviewProps,
    changeViewButtonLabel,
    subview,
    onChange,
    ...rest
  } = restProps

  const value: MultiSelectOption[] = get(formik?.values, name)
  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <MultiSelectWithSubview
        {...multiSelectWithSubviewProps}
        subview={subview}
        changeViewButtonLabel={changeViewButtonLabel}
        items={items}
        key={items?.[0]?.label}
        value={value}
        multiSelectProps={{
          ...multiSelectWithSubviewProps?.multiSelectProps,
          disabled,
          tagInputProps: {
            ...multiSelectWithSubviewProps?.multiSelectProps?.tagInputProps,
            inputProps: {
              ...multiSelectWithSubviewProps?.multiSelectProps?.tagInputProps?.inputProps,
              onBlur: () => formik?.setFieldTouched(name, true, false)
            },
            intent,
            disabled
          },
          onChange: (selectedItems: MultiSelectOption[]) => {
            formik?.setFieldValue(name, selectedItems)
            onChange?.(selectedItems)
          },
          placeholder,
          name
        }}
      />
    </FormGroup>
  )
}

export const FormInput = {
  TagInput: connect(TagInput),
  KVTagInput: connect(KVTagInput),
  MultiInput: connect(MultiInput),
  CustomRender: connect(CustomRender),
  FileInput: connect(FileInput),
  RadioGroup: connect(RadioGroup),
  CheckBox: connect(CheckBox),
  Toggle: connect(Toggle),
  MultiSelect: connect(MultiSelect),
  Select: connect(Select),
  DropDown: connect(DropDown),
  Text: connect(Text),
  ExpressionInput: connect(ExpressionInput),
  TextArea: connect(TextArea),
  ColorPicker: connect(FormColorPicker),
  InputWithIdentifier: connect<Omit<InputWithIdentifierProps, 'formik'>>(InputWithIdentifier),
  MultiTypeInput: connect(FormMultiTypeInput),
  MultiTypeBiLevelInput: connect(FormMultiTypeBiLevelInput),
  SelectWithSubmenuTypeInput: connect(FormSelectWithSubmenuTypeInput),
  SelectWithSubmenuTypeInputV2: connect(FormSelectWithSubmenuTypeInputV2),
  MultiSelectWithSubmenuTypeInput: connect(FormMultiSelectWithSubmenuTypeInput),
  MultiTextInput: connect(FormMultiTextTypeInput),
  MultiSelectTypeInput: connect(FormMultiSelectTypeInput),
  CategorizedSelect: connect(FormCategorizedSelect),
  SelectWithSubview: connect(FormSelectWithSubview),
  MultiSelectWithSubview: connect(FormMultiSelectWithSubview),
  DurationInput: connect(DurationInput)
}

export const FormikForm = connect(Form)

// allow access to the form context without prop drilling
export { useFormikContext }
