import React from 'react'
import { connect, FormikContext, Form as FrmForm, Formik as FrmFormik } from 'formik'
import { SelectOption, Select as UiKitSelect, SelectProps as UiKitSelectProps } from '../Select/Select'
import {
  MultiSelect as UiKitMultiSelect,
  MultiSelectOption,
  MultiSelectProps as UiKitMultiSelectProps
} from '../MultiSelect/MultiSelect'
import { Checkbox as UiKitCheckbox, CheckboxProps as UiKitCheckboxProps } from '../Checkbox/Checkbox'
import { Radio } from '../Radio/Radio'
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
  FileInput as BpFileInput
} from '@blueprintjs/core'
import cx from 'classnames'
import css from './FormikForm.css'
import i18n from './FormikForm.i18n'

const isObject = (obj: any): boolean => obj !== null && typeof obj === 'object'

const errorCheck = (name: string, formik?: FormikContext<any>) =>
  (formik?.touched?.[name] || (formik?.submitCount && formik?.submitCount > 0)) &&
  formik?.errors[name] &&
  !isObject(formik?.errors[name])

interface FormikExtended<T> extends FormikContext<T> {
  disabled?: boolean
  inline?: boolean
}

interface FormikProps<T> {
  formik?: FormikExtended<T>
}

interface TagInputProps<T> extends Omit<IFormGroupProps, 'labelFor' | 'items'> {
  name: string
  items: T[]
  labelFor: UiKitTagInputProps<T>['labelFor']
  itemFromNewTag: UiKitTagInputProps<T>['itemFromNewTag']
  tagInputProps: Omit<
    UiKitTagInputProps<T>,
    'labelFor' | 'keyOf' | 'itemFromNewTag' | 'items' | 'onChange' | 'selectedItems'
  >
  onChange?: UiKitTagInputProps<T>['onChange']
}

function TagInput<T>(props: TagInputProps<T> & FormikProps<any>) {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? formik?.errors?.[name] : null,
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
        selectedItems={formik?.values?.[props.name] || []}
        onChange={(selectedItems: T[], createdItems: T[], items: T[]) => {
          formik?.setFieldValue(name, selectedItems)
          onChange?.(selectedItems, createdItems, items)
        }}
      />
    </FormGroup>
  )
}

interface CustomRenderProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  render: (formik: FormikExtended<any>, intent: Intent, disabled?: boolean, inline?: boolean) => React.ReactNode
}

const CustomRender = (props: CustomRenderProps & FormikProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? formik?.errors?.[name] : null,
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
}

const FileInput = (props: FileInputProps & FormikProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? formik?.errors?.[name] : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    placeholder = i18n.chooseFile,
    fileInput,
    buttonText = i18n.browse,
    onChange,
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
          value: formik?.values?.[props.name as any] || ''
        }}
        disabled={disabled}
        onInputChange={(e: React.FormEvent<HTMLInputElement>) => {
          formik?.setFieldValue(name, e.currentTarget.value)
          onChange?.(e)
        }}
        text={formik?.values?.[props.name as any] || placeholder}
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

const RadioGroup = (props: RadioGroupProps & FormikProps<any>) => {
  const { formik, name } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? formik?.errors?.[name] : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    items = [],
    radioGroup,
    onChange,
    ...rest
  } = props
  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
      <BpRadioGroup
        {...radioGroup}
        name={name}
        disabled={disabled}
        selectedValue={formik?.values?.[props.name as any]}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          formik?.setFieldValue(name, e.currentTarget.value)
          onChange?.(e)
        }}>
        {items.map(radio => (
          <Radio key={radio.value} {...radio} disabled={disabled} />
        ))}
      </BpRadioGroup>
    </FormGroup>
  )
}

interface CheckboxProps extends UiKitCheckboxProps, Omit<IFormGroupProps, 'labelFor' | 'label'> {
  name: string
}

const CheckBox = (props: CheckboxProps & FormikProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? formik?.errors?.[name] : null,
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
        inline={inline}
        disabled={disabled}
        value={formik?.values?.[props.name as any]}
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
  multiSelectProps?: Omit<UiKitMultiSelectProps, 'items' | 'onChange' | 'value' | 'tagInputProps'>
  onChange?: UiKitMultiSelectProps['onChange']
}

const MultiSelect = (props: MultiSelectProps & FormikProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? formik?.errors?.[name] : null,
    disabled = formik?.disabled,
    items,
    inline = formik?.inline,
    tagInputProps,
    multiSelectProps,
    onChange,
    ...rest
  } = restProps

  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
      <UiKitMultiSelect
        tagInputProps={{
          ...tagInputProps,
          inputProps: {
            name,
            onBlur: () => formik?.setFieldTouched(name)
          },
          intent,
          disabled: disabled
        }}
        {...multiSelectProps}
        items={items}
        value={formik?.values?.[props.name] || []}
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
  inputGroup?: Omit<IInputGroupProps, 'name' | 'value'>
  selectProps?: Omit<UiKitSelectProps, 'items' | 'onChange' | 'value'>
  onChange?: UiKitSelectProps['onChange']
}

const Select = (props: SelectProps & FormikProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? formik?.errors?.[name] : null,
    disabled = formik?.disabled,
    items,
    inline = formik?.inline,
    inputGroup,
    selectProps,
    onChange,
    ...rest
  } = restProps

  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
      <UiKitSelect
        inputProps={{
          ...inputGroup,
          name,
          intent,
          disabled: disabled,
          onBlur: () => formik?.setFieldTouched(name)
        }}
        {...selectProps}
        items={items}
        disabled={disabled}
        value={items.filter(item => item.value === formik?.values?.[props.name])[0]}
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
  inputGroup?: Omit<IInputGroupProps, 'name' | 'value' | 'onChange'>
  onChange?: IInputGroupProps['onChange']
}

const Text = (props: TextProps & FormikProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? formik?.errors?.[name] : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    inputGroup,
    onChange,
    ...rest
  } = restProps
  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
      <InputGroup
        {...inputGroup}
        name={name}
        intent={intent}
        disabled={disabled}
        value={formik?.values?.[props.name as any]}
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
  textArea?: Omit<ITextAreaProps, 'name' | 'value' | 'onChange'>
  onChange?: ITextAreaProps['onChange']
}

const TextArea = (props: TextAreaProps & FormikProps<any>) => {
  const { formik, name, ...restProps } = props
  const hasError = errorCheck(name, formik)
  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? formik?.errors[name] : null,
    disabled = formik?.disabled,
    inline = formik?.inline,
    textArea,
    onChange,
    ...rest
  } = restProps

  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
      <BpTextArea
        fill={true}
        {...textArea}
        name={name}
        intent={intent}
        disabled={disabled}
        onBlur={() => formik?.setFieldTouched(name)}
        value={formik?.values[props.name]}
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
  formLoading?: true
  formik?: FormikExtended<any>
}

const Form = (props: FormikFormProps) => {
  const { className = '', disabled = false, inline = false, children, formik, ...rest } = props
  if (formik) {
    formik.disabled = disabled
    formik.inline = inline
  }
  return (
    <FrmForm {...rest} className={cx(css.main, className)}>
      {children}
    </FrmForm>
  )
}

export const FormInput = {
  TagInput: connect(TagInput),
  CustomRender: connect(CustomRender),
  FileInput: connect(FileInput),
  RadioGroup: connect(RadioGroup),
  CheckBox: connect(CheckBox),
  MultiSelect: connect(MultiSelect),
  Select: connect(Select),
  Text: connect(Text),
  TextArea: connect(TextArea)
}

export const FormikForm = connect(Form)
export const Formik = FrmFormik
