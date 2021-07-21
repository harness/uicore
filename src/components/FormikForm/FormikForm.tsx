import React, { ReactNode, useCallback, useContext, useMemo } from 'react'
import { connect, FormikContext, Form as FrmForm, Formik as FrmFormik, FormikConfig, FormikActions } from 'formik'
import { SelectOption, Select as UiKitSelect, SelectProps as UiKitSelectProps } from '../Select/Select'
import {
  MultiSelect as UiKitMultiSelect,
  MultiSelectOption,
  MultiSelectProps as UiKitMultiSelectProps
} from '../MultiSelect/MultiSelect'
import { TagInput as BPTagInput, Utils } from '@blueprintjs/core'
import { Utils as UiCoreUtils } from '../../core/Utils'
import { Checkbox as UiKitCheckbox, CheckboxProps as UiKitCheckboxProps } from '../Checkbox/Checkbox'
import cssRadio from '../Radio/Radio.css'
import { TagInputProps as UiKitTagInputProps, TagInput as UiKitTagInput } from '../TagInput/TagInput'
import checkBoxCss from '../Checkbox/Checkbox.css'
import {
  FormGroup,
  InputGroup,
  IFormGroupProps,
  IInputGroupProps,
  Intent,
  ITagInputProps,
  IRadioGroupProps,
  ITextAreaProps,
  IOptionProps,
  IFileInputProps,
  TextArea as BpTextArea,
  RadioGroup as BpRadioGroup,
  FileInput as BpFileInput,
  HTMLInputProps
} from '@blueprintjs/core'
import { compact, get, isNil, omit } from 'lodash-es'
import cx from 'classnames'
import css from './FormikForm.css'
import i18n from './FormikForm.i18n'
import { OverlaySpinner } from '../OverlaySpinner/OverlaySpinner'
import { ColorPickerProps, ColorPicker } from '../ColorPicker/ColorPicker'
import { InputWithIdentifier, InputWithIdentifierProps } from '../InputWithIdentifier/InputWithIdentifier'
import {
  MultiTypeInput,
  MultiTypeInputProps,
  MultiSelectTypeInputProps,
  MultiSelectTypeInput,
  MultiTextInputProps,
  MultiTextInput,
  getMultiTypeFromValue
} from '../MultiTypeInput/MultiTypeInput'
import {
  CategorizedSelectProps,
  CategorizedSelect,
  CategorizedSelectOption
} from '../CategorizedSelected/CategorizedSelect'
import { SelectWithSubviewProps, SelectWithSubview } from '../SelectWithSubview/SelectWithSubview'
import { MultiSelectWithSubviewProps, MultiSelectWithSubview } from '../MultiSelectWithSubView/MultiSelectWithSubView'
import { MentionsInfo, register, unregister } from '@wings-software/mentions'
import {
  ExpressionInputProps as ExpressionInputLocalProps,
  ExpressionInput as ExpressionInputLocal
} from '../ExpressionInput/ExpressionInput'
import { DataTooltipInterface } from '../../frameworks/Tooltip/types'
import { HarnessDocTooltip } from '../../frameworks/Tooltip/Tooltip'
import { FormikTooltipContext } from './FormikTooltipContext'
import { MultiTypeInputType } from '../MultiTypeInput/MultiTypeInputUtils'
import { FormError } from '../FormError/FormError'

const IsOptionLabel = '(optional)'
const isObject = (obj: any): boolean => obj !== null && typeof obj === 'object'
const isFunction = (obj: any): boolean => typeof obj === 'function'

const errorCheck = (name: string, formik?: FormikContext<any>) =>
  (get(formik?.touched, name) || (formik?.submitCount && formik?.submitCount > 0)) &&
  get(formik?.errors, name) &&
  !isObject(get(formik?.errors, name))

export const getDefaultAutoCompleteValue = (): string => 'off'

export interface FormikExtended<T> extends FormikContext<T> {
  disabled?: boolean
  inline?: boolean
  formName: string
}

export interface FormikContextProps<T> {
  formik?: FormikExtended<T>
  optionalLabel?: string
  isOptional?: boolean // default to false
  autoComplete?: string
  tooltipProps?: DataTooltipInterface // todo mark it as mandatory
}

export const getFormFieldLabel = (
  label: ReactNode | string | undefined,
  fieldName: string,
  props: FormikContextProps<any>,
  css?: string
): ReactNode | string | undefined => {
  const optionalLabel = props.optionalLabel || IsOptionLabel
  const labelText = !props.isOptional ? label : `${label} ${optionalLabel}`
  if (!labelText) {
    return labelText
  }
  const tooltipContext = useContext(FormikTooltipContext)
  const dataTooltipId =
    props.tooltipProps?.dataTooltipId || (tooltipContext?.formName ? `${tooltipContext?.formName}_${fieldName}` : '')
  return <HarnessDocTooltip tooltipId={dataTooltipId} labelText={labelText} className={css || ''} />
}

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
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
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
  mentionsInfo?: Partial<MentionsInfo>
  tagsProps?: Partial<ITagInputProps>
}

type KVAccumulator = { [key: string]: string }

const MENTIONS_DEFAULT: MentionsInfo = {
  identifiersSet: /[A-Za-z0-9_.'"\(\)]/, // eslint-disable-line no-useless-escape
  trigger: ['<', '<+'],
  rule: '<+__match__>',
  cached: true,
  data: done => done([])
}

function KVTagInput(props: KVTagInputProps & FormikContextProps<any>) {
  const { formik, name, mentionsInfo, tagsProps, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    label,
    ...rest
  } = restProps
  const [mentionsType] = React.useState(`kv-tag-input-${name}}`)

  React.useEffect(() => {
    register(mentionsType, Object.assign({}, MENTIONS_DEFAULT, mentionsInfo))
    return () => unregister(mentionsType)
  }, [])

  return (
    <FormGroup
      labelFor={name}
      label={getFormFieldLabel(label, name, props)}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <BPTagInput
        values={Object.keys(formik?.values[name] || {}).map(key => {
          const value = formik?.values[name][key]
          return value ? `${key}:${value}` : key
        })}
        onChange={(changed: unknown) => {
          const values: string[] = changed as string[]
          formik?.setFieldValue(
            name,
            values?.reduce((acc, tag) => {
              const parts = tag.split(':')
              acc[parts[0]] = parts[1]?.trim() || ''
              return acc
            }, {} as KVAccumulator) || {}
          )
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

export interface MultiInputProps extends Omit<IFormGroupProps, 'labelFor' | 'items'> {
  name: string
  mentionsInfo?: Partial<MentionsInfo>
  tagsProps?: Partial<ITagInputProps>
}

function MultiInput(props: MultiInputProps & FormikContextProps<any>) {
  const { formik, name, mentionsInfo, tagsProps, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    label,
    ...rest
  } = restProps
  const [mentionsType] = React.useState(`multi-input-${name}}`)

  React.useEffect(() => {
    register(mentionsType, Object.assign({}, MENTIONS_DEFAULT, mentionsInfo))
    return () => unregister(mentionsType)
  }, [])

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
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
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
}

const FileInput = (props: FileInputProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    placeholder = i18n.chooseFile,
    fileInput,
    label,
    buttonText = i18n.browse,
    onChange,
    inputProps,
    multiple = false,
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
          formik?.setFieldValue(name, multiple ? Array.from(e.currentTarget.files || []) : e.currentTarget.files?.[0])
          onChange?.(e)
        }}
        text={get(formik?.values, name, [{ name: placeholder }])
          .map((file: File) => file.name)
          .join(', ')}
      />
    </FormGroup>
  )
}

export interface RadioGroupProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  items: IOptionProps[]
  radioGroup?: Omit<IRadioGroupProps, 'name' | 'value' | 'onChange' | 'options'>
  onChange?: IRadioGroupProps['onChange']
}

const RadioGroup = (props: RadioGroupProps & FormikContextProps<any>) => {
  const { formik, name } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    items = [],
    label,
    radioGroup,
    onChange,
    ...rest
  } = props

  const itemTemp = items.map(item => {
    const { className = '' } = item
    return {
      ...item,
      className: cx(cssRadio.radio, className)
    }
  })
  return (
    <FormGroup
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}
      inline={inline}
      {...rest}>
      <BpRadioGroup
        {...radioGroup}
        name={name}
        disabled={disabled}
        selectedValue={get(formik?.values, name)}
        options={itemTemp}
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
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
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
        className={cx(checkBoxCss.checkbox, className)}
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

export interface MultiSelectProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  items: MultiSelectOption[]
  tagInputProps?: ITagInputProps
  placeholder?: string
  multiSelectProps?: Omit<UiKitMultiSelectProps, 'items' | 'onChange' | 'value' | 'tagInputProps'>
  onChange?: UiKitMultiSelectProps['onChange']
}

const MultiSelect = (props: MultiSelectProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    items,
    label,
    inline = formik?.inline,
    tagInputProps,
    placeholder,
    multiSelectProps,
    onChange,
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
            placeholder,

            onBlur: () => formik?.setFieldTouched(name)
          },
          intent,
          disabled: disabled
        }}
        {...multiSelectProps}
        items={items}
        value={Array.isArray(formikValue) ? formikValue : []}
        onChange={(items: MultiSelectOption[]) => {
          formik?.setFieldValue(name, items)
          onChange?.(items)
        }}
        resetOnSelect={true}
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
}

const Select = (props: SelectProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
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
      usePortal={!!props.usePortal}
      {...rest}>
      <UiKitSelect
        name={name}
        inputProps={{
          ...inputGroup,
          autoComplete,
          name,
          intent,
          placeholder: UiCoreUtils.getSelectComponentPlaceholder(placeholder),
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

export interface TextProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  inputGroup?: Omit<IInputGroupProps & HTMLInputProps, 'name' | 'value' | 'onChange' | 'placeholder'>
  placeholder?: string
  onChange?: IInputGroupProps['onChange']
}

const Text = (props: TextProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
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
          formik?.setFieldTouched(name)
          inputGroup?.onBlur?.(e)
        }}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          if (inputGroup?.type === 'number') {
            formik?.setFieldValue(name, parseFloat(e.currentTarget.value))
          } else {
            formik?.setFieldValue(name, e.currentTarget.value)
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
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
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
}

const TextArea = (props: TextAreaProps & FormikContextProps<any>) => {
  const { formik, name, autoFocus, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    placeholder,
    label,
    textArea,
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
      <BpTextArea
        fill={true}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        maxLength={1024}
        {...textArea}
        name={name}
        intent={intent}
        disabled={disabled}
        placeholder={placeholder}
        onBlur={() => formik?.setFieldTouched(name)}
        value={get(formik?.values, name)}
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
  formLoading?: true
  render?: (props: FormikExtended<Values>) => React.ReactNode
  onSubmit: (values: Values, formikActions: FormikActions<Values>) => void | Promise<Values>
  formName: string
}

export function Formik<Values = Record<string, unknown>>(props: FormikProps<Values>): React.ReactElement {
  const { formLoading = false, onSubmit, render, children, ...rest } = props
  const [isFormLoading, setFormLoading] = React.useState(false)
  React.useEffect(() => {
    setFormLoading(formLoading)
  }, [formLoading])

  const onSubmitLocal = React.useCallback(
    (values: Values, formikActions: FormikActions<Values>) => {
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

  const renderLocal = React.useCallback(
    (formik: FormikExtended<any>) => {
      return <OverlaySpinner show={isFormLoading}>{render?.(formik)}</OverlaySpinner>
    },
    [render, isFormLoading]
  )

  const functionRenderLocal = React.useCallback(
    (formik: FormikExtended<any>) => {
      return (
        <OverlaySpinner show={isFormLoading}>
          {(children as (props: FormikExtended<any>) => React.ReactNode)(formik)}
        </OverlaySpinner>
      )
    },
    [children, isFormLoading]
  )

  let renderProps: { render?: any } = {}
  if (render) {
    renderProps = {
      render: renderLocal
    }
  } else if (isFunction(children)) {
    renderProps = {
      render: functionRenderLocal
    }
  }

  return (
    <FormikTooltipContext.Provider value={{ formName: props.formName }}>
      <FrmFormik {...rest} {...renderProps} onSubmit={onSubmitLocal}>
        {!render && !isFunction(children) && <OverlaySpinner show={isFormLoading}>{children}</OverlaySpinner>}
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
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
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

export interface FormMultiTypeInputProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: string
  placeholder?: string
  /**
   *Enable this when we want to use value, instead of label/value
   */
  useValue?: boolean
  selectItems: SelectOption[]
  multiTypeInputProps?: Omit<MultiTypeInputProps, 'name'>
  disabled?: boolean
}

const FormMultiTypeInput = (props: FormMultiTypeInputProps & FormikContextProps<any>) => {
  const { formik, name, useValue = false, selectItems, placeholder, multiTypeInputProps, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    label,
    ...rest
  } = restProps
  const [currentType, setCurrentType] = React.useState(getMultiTypeFromValue(get(formik?.values, name, '')))
  const onChangeCallback: MultiTypeInputProps['onChange'] = useCallback(
    (val, valueType, type) => {
      type !== currentType && setCurrentType(type)
      if (useValue && type === MultiTypeInputType.FIXED) {
        formik?.setFieldValue(name, val?.value)
      } else {
        formik?.setFieldValue(name, val)
      }
      formik?.setFieldTouched(name)
      multiTypeInputProps?.onChange?.(val, valueType, type)
    },
    [formik, multiTypeInputProps]
  )

  let value = get(formik?.values, name) // formik form value
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
      <MultiTypeInput
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
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    label,
    ...rest
  } = restProps
  const autoComplete = props.autoComplete || getDefaultAutoCompleteValue()
  let value = get(formik?.values, name)
  if (useValue && getMultiTypeFromValue(value) === MultiTypeInputType.FIXED) {
    value = compact(
      value.map((val: string) => {
        return selectItems.filter(item => item.value === val)
      })
    )
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
          formik?.setFieldTouched(name)
          multiSelectTypeInputProps?.onChange?.(value, valueType, type)
        }}
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
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
    disabled = formik?.disabled,
    label,
    ...rest
  } = restProps
  const value = get(formik?.values, name, '')
  const customTextInputProps: Omit<IInputGroupProps & HTMLInputProps, 'onChange' | 'value'> = useMemo(
    () => ({
      ...multiTextInputProps?.textProps,
      name,
      value,
      placeholder,
      onBlur: () => formik?.setFieldTouched(name)
    }),
    [multiTextInputProps?.textProps]
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
          formik?.setFieldValue(name, valueChange)
          onChange?.(value, valueType, type)
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
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
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
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
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
          onBlur: () => formik?.setFieldTouched(name)
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
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
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
              onBlur: () => formik?.setFieldTouched(name)
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
  MultiSelect: connect(MultiSelect),
  Select: connect(Select),
  Text: connect(Text),
  ExpressionInput: connect(ExpressionInput),
  TextArea: connect(TextArea),
  ColorPicker: connect(FormColorPicker),
  InputWithIdentifier: connect<Omit<InputWithIdentifierProps, 'formik'>>(InputWithIdentifier),
  MultiTypeInput: connect(FormMultiTypeInput),
  MultiTextInput: connect(FormMultiTextTypeInput),
  MultiSelectTypeInput: connect(FormMultiSelectTypeInput),
  CategorizedSelect: connect(FormCategorizedSelect),
  SelectWithSubview: connect(FormSelectWithSubview),
  MultiSelectWithSubview: connect(FormMultiSelectWithSubview)
}

export const FormikForm = connect(Form)
