import React from 'react'
import { connect, FormikContext, Form as FrmForm, Formik as FrmFormik, FormikConfig, FormikActions } from 'formik'
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
  FileInput as BpFileInput,
  HTMLInputProps
} from '@blueprintjs/core'
import get from 'lodash.get'
import cx from 'classnames'
import css from './FormikForm.css'
import i18n from './FormikForm.i18n'
import { OverlaySpinner } from '../OverlaySpinner/OverlaySpinner'

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

interface FormikContenxtProps<T> {
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

function TagInput<T>(props: TagInputProps<T> & FormikContenxtProps<any>) {
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

interface CustomRenderProps extends Omit<IFormGroupProps, 'labelFor'> {
  name: string
  render: (formik: FormikExtended<any>, intent: Intent, disabled?: boolean, inline?: boolean) => React.ReactNode
}

const CustomRender = (props: CustomRenderProps & FormikContenxtProps<any>) => {
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
}

const FileInput = (props: FileInputProps & FormikContenxtProps<any>) => {
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
          value: get(formik?.values, name, '')
        }}
        disabled={disabled}
        onInputChange={(e: React.FormEvent<HTMLInputElement>) => {
          formik?.setFieldValue(name, e.currentTarget.value)
          onChange?.(e)
        }}
        text={get(formik?.values, name, placeholder)}
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

const RadioGroup = (props: RadioGroupProps & FormikContenxtProps<any>) => {
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
  return (
    <FormGroup labelFor={name} helperText={helperText} intent={intent} disabled={disabled} inline={inline} {...rest}>
      <BpRadioGroup
        {...radioGroup}
        name={name}
        disabled={disabled}
        selectedValue={get(formik?.values, name)}
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
  label: string
}

const CheckBox = (props: CheckboxProps & FormikContenxtProps<any>) => {
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

const MultiSelect = (props: MultiSelectProps & FormikContenxtProps<any>) => {
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

const Select = (props: SelectProps & FormikContenxtProps<any>) => {
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

const Text = (props: TextProps & FormikContenxtProps<any>) => {
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
        value={get(formik?.values, name)}
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

const TextArea = (props: TextAreaProps & FormikContenxtProps<any>) => {
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
