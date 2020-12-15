import React, { useCallback, useMemo } from 'react'
import { connect, FormikContext, Form as FrmForm, Formik as FrmFormik, FormikConfig, FormikActions } from 'formik'
import { SelectOption, Select as UiKitSelect, SelectProps as UiKitSelectProps } from '../Select/Select'
import {
  MultiSelect as UiKitMultiSelect,
  MultiSelectOption,
  MultiSelectProps as UiKitMultiSelectProps
} from '../MultiSelect/MultiSelect'
import { TagInput as BPTagInput } from '@blueprintjs/core'
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
import get from 'lodash.get'
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
  MultiTextInput
} from '../MultiTypeInput/MultiTypeInput'
import {
  CategorizedSelectProps,
  CategorizedSelect,
  CategorizedSelectOption
} from '../CategorizedSelected/CategorizedSelect'
import { SelectWithSubviewProps, SelectWithSubview } from '../SelectWithSubview/SelectWithSubview'
import { MultiSelectWithSubviewProps, MultiSelectWithSubview } from '../MultiSelectWithSubView/MultiSelectWithSubView'
import { MentionsInfo, register, unregister } from '@wings-software/mentions'

const isObject = (obj: any): boolean => obj !== null && typeof obj === 'object'
const isFunction = (obj: any): boolean => typeof obj === 'function'

const errorCheck = (name: string, formik?: FormikContext<any>) =>
  (get(formik?.touched, name) || (formik?.submitCount && formik?.submitCount > 0)) &&
  get(formik?.errors, name) &&
  !isObject(get(formik?.errors, name))

interface FormikExtended<T> extends FormikContext<T> {
  disabled?: boolean
  inline?: boolean
}

interface FormikContextProps<T> {
  formik?: FormikExtended<T>
}

interface TagInputProps<T> extends Omit<IFormGroupProps, 'labelFor' | 'items'> {
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
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    items,
    labelFor,
    itemFromNewTag,
    inline = formik?.inline,
    tagInputProps,
    onChange,
    ...rest
  } = restProps

  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
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

interface KVTagInputProps extends Omit<IFormGroupProps, 'labelFor' | 'items'> {
  name: string
  mentionsInfo?: Partial<MentionsInfo>
  tagsProps?: Partial<ITagInputProps>
}

type KVAccumulator = { [key: string]: string }

const MENTIONS_DEFAULT: MentionsInfo = {
  identifiersSet: /[A-Za-z0-9_.'"\(\)]/, // eslint-disable-line no-useless-escape
  trigger: ['$', '${'],
  rule: '${__match__}',
  cached: true,
  data: done => done([])
}

function KVTagInput(props: KVTagInputProps & FormikContextProps<any>) {
  const { formik, name, mentionsInfo, tagsProps, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    ...rest
  } = restProps
  const [mentionsType] = React.useState(`kv-tag-input-${name}}`)

  React.useEffect(() => {
    register(mentionsType, Object.assign({}, MENTIONS_DEFAULT, mentionsInfo))
    return () => unregister(mentionsType)
  }, [])

  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
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
        {...tagsProps}
      />
    </FormGroup>
  )
}

interface CustomRenderProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  render: (formik: FormikExtended<any>, intent: Intent, disabled?: boolean, inline?: boolean) => React.ReactNode
}

const CustomRender = (props: CustomRenderProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    render,
    ...rest
  } = restProps

  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion*/}
      {render(formik!, intent, disabled, inline)}
    </FormGroup>
  )
}

interface FileInputProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  fileInput?: Omit<IFileInputProps, 'inputProps' | 'text' | 'buttonText'>
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
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    placeholder = i18n.chooseFile,
    fileInput,
    buttonText = i18n.browse,
    onChange,
    multiple = false,
    ...rest
  } = restProps
  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
      <BpFileInput
        fill={true}
        {...fileInput}
        buttonText={buttonText}
        inputProps={{
          name,
          disabled,
          multiple
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

interface RadioGroupProps extends Omit<IFormGroupProps, 'labelFor'> {
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
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    items = [],
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
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
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

interface CheckboxProps extends UiKitCheckboxProps, Omit<IFormGroupProps, 'labelFor' | 'label'> {
  name: string
  label: string
}

const CheckBox = (props: CheckboxProps & FormikContextProps<any>) => {
  const { formik, name, label, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    onChange,
    className = '',
    ...rest
  } = restProps
  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} {...rest}>
      <UiKitCheckbox
        {...rest}
        className={cx(checkBoxCss.checkbox, className)}
        name={name}
        label={label}
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

interface MultiSelectProps extends Omit<IFormGroupProps, 'labelFor'> {
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
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    items,
    inline = formik?.inline,
    tagInputProps,
    placeholder,
    multiSelectProps,
    onChange,
    ...rest
  } = restProps

  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
      <UiKitMultiSelect
        name={name}
        tagInputProps={{
          ...tagInputProps,
          inputProps: {
            name,
            placeholder,
            onBlur: () => formik?.setFieldTouched(name)
          },
          intent,
          disabled: disabled
        }}
        {...multiSelectProps}
        items={items}
        value={get(formik?.values, name, [])}
        onChange={(items: MultiSelectOption[]) => {
          formik?.setFieldValue(name, items)
          onChange?.(items)
        }}
      />
    </FormGroup>
  )
}

interface SelectProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  items: SelectOption[]
  placeholder?: string
  inputGroup?: Omit<IInputGroupProps, 'name' | 'value'>
  selectProps?: Omit<UiKitSelectProps, 'items' | 'onChange' | 'value'>
  onChange?: UiKitSelectProps['onChange']
}

const Select = (props: SelectProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    items,
    placeholder,
    inline = formik?.inline,
    inputGroup,
    selectProps,
    onChange,
    ...rest
  } = restProps

  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
      <UiKitSelect
        name={name}
        inputProps={{
          ...inputGroup,
          name,
          intent,
          placeholder,
          disabled: disabled,
          onBlur: () => formik?.setFieldTouched(name)
        }}
        {...selectProps}
        items={items}
        disabled={disabled}
        value={items.filter(item => item.value === get(formik?.values, name))[0]}
        onChange={(item: SelectOption) => {
          formik?.setFieldValue(name, item.value)
          onChange?.(item)
        }}
      />
    </FormGroup>
  )
}

interface TextProps extends Omit<IFormGroupProps, 'labelFor'> {
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
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    inputGroup,
    placeholder,
    onChange,
    ...rest
  } = restProps
  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
      <InputGroup
        autoComplete="off"
        {...inputGroup}
        name={name}
        placeholder={placeholder}
        intent={intent}
        disabled={disabled}
        value={get(formik?.values, name) || ''}
        onBlur={() => formik?.setFieldTouched(name)}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          formik?.setFieldValue(name, e.currentTarget.value)
          onChange?.(e)
        }}
      />
    </FormGroup>
  )
}

interface TextAreaProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  placeholder?: string
  textArea?: Omit<ITextAreaProps, 'name' | 'value' | 'onChange'>
  onChange?: ITextAreaProps['onChange']
}

const TextArea = (props: TextAreaProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    placeholder,
    textArea,
    onChange,
    ...rest
  } = restProps

  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
      <BpTextArea
        fill={true}
        autoComplete="off"
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

interface FormikFormProps extends Omit<HTMLFormElement, 'className'> {
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

interface FormikProps<Values> extends Omit<FormikConfig<Values>, 'onSubmit' | 'render'> {
  formLoading?: true
  render?: (props: FormikExtended<Values>) => React.ReactNode
  onSubmit: (values: Values, formikActions: FormikActions<Values>) => void | Promise<Values>
}

export const Formik = <Values extends object>(props: FormikProps<Values>) => {
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
    <FrmFormik {...rest} {...renderProps} onSubmit={onSubmitLocal}>
      {!render && !isFunction(children) && <OverlaySpinner show={isFormLoading}>{children}</OverlaySpinner>}
    </FrmFormik>
  )
}

interface FormColorPickerProps extends ColorPickerProps, Omit<IFormGroupProps, 'labelFor' | 'label'> {
  name: string
  label: string
}

const FormColorPicker = (props: FormColorPickerProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    onChange,
    ...rest
  } = restProps
  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} {...rest}>
      <ColorPicker
        height={38}
        {...rest}
        onChange={(color: string) => {
          formik?.setFieldValue(name, color)
          onChange?.(color)
        }}
      />
    </FormGroup>
  )
}

interface FormMultiTypeInputProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: string
  placeholder?: string
  selectItems: SelectOption[]
  multiTypeInputProps?: Omit<MultiTypeInputProps, 'name'>
}

const FormMultiTypeInput = (props: FormMultiTypeInputProps & FormikContextProps<any>) => {
  const { formik, name, selectItems, placeholder, multiTypeInputProps, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    ...rest
  } = restProps
  const onChangeCallback: MultiTypeInputProps['onChange'] = useCallback(
    (value, valueType) => {
      formik?.setFieldValue(name, value)
      formik?.setFieldTouched(name)
      multiTypeInputProps?.onChange?.(value, valueType)
    },
    [formik, multiTypeInputProps]
  )
  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} {...rest}>
      <MultiTypeInput
        {...multiTypeInputProps}
        value={get(formik?.values, name)}
        name={name}
        selectProps={{
          items: selectItems,
          ...multiTypeInputProps?.selectProps,
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

interface FormMultiSelectTypeInputProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: string
  placeholder?: string
  selectItems: MultiSelectOption[]
  multiSelectTypeInputProps?: Omit<MultiSelectTypeInputProps, 'name'>
}

const FormMultiSelectTypeInput = (props: FormMultiSelectTypeInputProps & FormikContextProps<any>) => {
  const { formik, name, selectItems, placeholder, multiSelectTypeInputProps, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    ...rest
  } = restProps
  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} {...rest}>
      <MultiSelectTypeInput
        {...multiSelectTypeInputProps}
        value={get(formik?.values, name)}
        name={name}
        multiSelectProps={{
          ...multiSelectTypeInputProps?.multiSelectProps,
          tagInputProps: {
            ...multiSelectTypeInputProps?.multiSelectProps?.tagInputProps,
            inputProps: {
              name,
              placeholder
            },
            intent,
            disabled: disabled
          },
          items: selectItems
        }}
        onChange={(value, valueType) => {
          formik?.setFieldValue(name, value)
          formik?.setFieldTouched(name)
          multiSelectTypeInputProps?.onChange?.(value, valueType)
        }}
      />
    </FormGroup>
  )
}

interface FormMultiTextTypeInputProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  label: string
  placeholder?: string
  onChange?: MultiTextInputProps['onChange']
  multiTextInputProps?: Omit<MultiTextInputProps, 'name'> /* In case you really want to customize the text input */
}

const FormMultiTextTypeInput = (props: FormMultiTextTypeInputProps & FormikContextProps<any>) => {
  const { formik, name, placeholder, multiTextInputProps, onChange, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    ...rest
  } = restProps
  const value = get(formik?.values, name, '')
  const customMultiTextInputProps: MultiTextInputProps = useMemo(
    () => ({
      ...multiTextInputProps,
      name,
      textProps: {
        ...multiTextInputProps?.textProps,
        value,
        placeholder,
        onBlur: () => formik?.setFieldTouched(name)
      }
    }),
    []
  )

  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} {...rest}>
      <MultiTextInput
        value={value}
        name={name}
        {...customMultiTextInputProps}
        onChange={(value, valueType) => {
          formik?.setFieldValue(name, value)
          onChange?.(value, valueType)
        }}
      />
    </FormGroup>
  )
}

interface FormCategorizedSelect extends Omit<IFormGroupProps, 'labelFor'> {
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
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    items = [],
    placeholder,
    inline = formik?.inline,
    categorizedSelectProps,
    onChange,
    ...rest
  } = restProps

  const value = get(formik?.values, name)

  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
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

interface FormSelectWithSubviewProps extends Omit<IFormGroupProps, 'labelFor'> {
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
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    items = [],
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
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
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

interface FormMultiSelectWithSubviewProps extends Omit<IFormGroupProps, 'labelFor'> {
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
}

const FormMultiSelectWithSubview = (props: FormMultiSelectWithSubviewProps & FormikContextProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? get(formik?.errors, name) : null,
    disabled = formik?.disabled,
    items = [],
    placeholder,
    inline = formik?.inline,
    multiSelectWithSubviewProps,
    changeViewButtonLabel,
    subview,
    onChange,
    ...rest
  } = restProps

  const value: MultiSelectOption[] = get(formik?.values, name)

  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
      <MultiSelectWithSubview
        {...multiSelectWithSubviewProps}
        subview={subview}
        changeViewButtonLabel={changeViewButtonLabel}
        items={items}
        key={items?.[0]?.label}
        value={value}
        multiSelectProps={{
          ...multiSelectWithSubviewProps?.multiSelectProps,
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
  CustomRender: connect(CustomRender),
  FileInput: connect(FileInput),
  RadioGroup: connect(RadioGroup),
  CheckBox: connect(CheckBox),
  MultiSelect: connect(MultiSelect),
  Select: connect(Select),
  Text: connect(Text),
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
