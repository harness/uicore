import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '../Button/Button'
import { Select, SelectProps, SelectOption } from '../Select/Select'
import { TextInput } from '../TextInput/TextInput'
import { Layout, LayoutProps } from '../../layouts/Layout'
import css from './MultiTypeInput.css'
import { Icon, IconName } from '../../icons/Icon'
import { Color } from '../../core/Color'
import { Position, Menu, PopoverInteractionKind, IInputGroupProps, InputGroup, HTMLInputProps } from '@blueprintjs/core'
import cx from 'classnames'
import { register, unregister, MentionsInfo } from '@wings-software/mentions'
import i18nBase from './MultiTypeInput.i18n'
import { I18nResource } from '../../core/Types'
import { Utils } from '../../core/Utils'
import { MultiSelectOption, MultiSelectProps, MultiSelect } from '../MultiSelect/MultiSelect'

export enum MultiTypeInputType {
  FIXED = 'FIXED',
  RUNTIME = 'RUNTIME',
  EXPRESSION = 'EXPRESSION'
}

export enum MultiTypeInputValue {
  STRING = 'STRING',
  SELECT_OPTION = 'SELECT_OPTION',
  MULTI_SELECT_OPTION = 'MULTI_SELECT_OPTION'
}

const TypeIcon: Record<string, IconName> = {
  FIXED: 'fixed-input',
  RUNTIME: 'runtime-input',
  EXPRESSION: 'expression-input'
}

export const RUNTIME_INPUT_VALUE = '<+input>'
export const EXPRESSION_INPUT_PLACEHOLDER = '${expression}'
const MENTIONS_DEFAULT: MentionsInfo = {
  identifiersSet: /[A-Za-z0-9_.'"\(\)]/, // eslint-disable-line no-useless-escape
  trigger: ['$', '${'],
  rule: '${__match__}',
  cached: true,
  data: done => done([])
}

type AcceptableValue = boolean | string | SelectOption | MultiSelectOption[]

export interface ExpressionAndRuntimeTypeProps<T = unknown> extends Omit<LayoutProps, 'onChange'> {
  value?: AcceptableValue
  defaultValueToReset?: AcceptableValue
  width?: number
  mentionsInfo?: Partial<MentionsInfo>
  onTypeChange?: (type: MultiTypeInputType) => void
  onChange?: (value: AcceptableValue | undefined, type: MultiTypeInputValue) => void
  i18n?: I18nResource
  btnClassName?: string
  allowableTypes?: MultiTypeInputType[]
  fixedTypeComponent: (props: FixedTypeComponentProps & T) => JSX.Element
  fixedTypeComponentProps?: T
  name: string
}

export interface FixedTypeComponentProps {
  onChange: ExpressionAndRuntimeTypeProps['onChange']
  value?: AcceptableValue
}

export const isValueAnExpression = (value: string) => /^\${.*}$/.test(value)

export const getMultiTypeFromValue = (
  value: AcceptableValue | undefined = '',
  allowableTypes?: MultiTypeInputType[]
): MultiTypeInputType => {
  if (typeof value === 'boolean') {
    return MultiTypeInputType.FIXED
  } else if (typeof value === 'string') {
    value = value.toLocaleLowerCase().trim()
    if (value.startsWith(RUNTIME_INPUT_VALUE)) return MultiTypeInputType.RUNTIME
    if (isValueAnExpression(value)) return MultiTypeInputType.EXPRESSION
  }
  if (!value && allowableTypes?.length) {
    return allowableTypes[0]
  }
  return MultiTypeInputType.FIXED
}

export function ExpressionAndRuntimeType<T = unknown>(props: ExpressionAndRuntimeTypeProps<T>): React.ReactElement {
  const {
    value,
    defaultValueToReset,
    width,
    mentionsInfo,
    onTypeChange,
    onChange,
    i18n: _i18n = {},
    fixedTypeComponent,
    fixedTypeComponentProps,
    btnClassName = '',
    allowableTypes,
    name,
    ...layoutProps
  } = props
  const i18n = useMemo(() => Object.assign({}, i18nBase, _i18n), [_i18n])
  const [type, setType] = useState<MultiTypeInputType>(getMultiTypeFromValue(value))
  const [mentionsType] = useState(`multi-type-input-${Utils.randomId()}`)
  const allowedTypes = useMemo(() => {
    return allowableTypes?.length
      ? allowableTypes
      : [MultiTypeInputType.FIXED, MultiTypeInputType.RUNTIME, MultiTypeInputType.EXPRESSION]
  }, [allowableTypes])
  const switchType = useCallback(
    (newType: MultiTypeInputType) => {
      setType(newType)
      onTypeChange?.(newType)
      const _inputValue = newType === MultiTypeInputType.RUNTIME ? RUNTIME_INPUT_VALUE : defaultValueToReset
      onChange?.(_inputValue, MultiTypeInputValue.STRING)
    },
    [type, defaultValueToReset, onChange, onTypeChange]
  )
  const inputWidth = width && width - 28
  const FixedTypeComponent = fixedTypeComponent
  const fixedComponentOnChangeCallback = useCallback(
    (val, multiTypeInputValue: MultiTypeInputValue) => {
      onChange?.(val, multiTypeInputValue)
    },
    [onChange]
  )
  const menu = useMemo(
    () => (
      <Menu className={css.menu}>
        {allowedTypes.find(allowedType => allowedType === MultiTypeInputType.FIXED) && (
          <Menu.Item
            labelElement={<Icon name={TypeIcon.FIXED} color={Color.BLUE_500} />}
            text={i18n.fixedValue}
            onClick={() => switchType(MultiTypeInputType.FIXED)}
          />
        )}
        {allowedTypes.find(allowedType => allowedType === MultiTypeInputType.RUNTIME) && (
          <Menu.Item
            labelElement={<Icon name={TypeIcon.RUNTIME} color={Color.PURPLE_500} />}
            text={i18n.runtimeInput}
            onClick={() => switchType(MultiTypeInputType.RUNTIME)}
          />
        )}
        {allowedTypes.find(allowedType => allowedType === MultiTypeInputType.EXPRESSION) && (
          <Menu.Item
            labelElement={<Icon name={TypeIcon.EXPRESSION} color={Color.YELLOW_500} />}
            text={i18n.expression}
            onClick={() => switchType(MultiTypeInputType.EXPRESSION)}
          />
        )}
      </Menu>
    ),
    []
  )

  useEffect(() => {
    if (type === MultiTypeInputType.EXPRESSION) {
      unregister(mentionsType)
      register(mentionsType, Object.assign({}, MENTIONS_DEFAULT, mentionsInfo))
    }
    return () => unregister(mentionsType)
  }, [type])

  return (
    <Layout.Horizontal
      className={cx(css.main, type === MultiTypeInputType.RUNTIME && css.disabled)}
      width={width}
      {...layoutProps}>
      {type === MultiTypeInputType.FIXED && (
        <FixedTypeComponent
          {...(fixedTypeComponentProps as T)}
          value={value}
          onChange={fixedComponentOnChangeCallback}
        />
      )}
      {type === MultiTypeInputType.RUNTIME && (
        <TextInput
          className={css.input}
          name={name}
          style={{ width: inputWidth }}
          placeholder={RUNTIME_INPUT_VALUE}
          disabled
          value={value as string}
        />
      )}
      {type === MultiTypeInputType.EXPRESSION && (
        <TextInput
          className={css.input}
          name={name}
          style={{ width: inputWidth }}
          placeholder={EXPRESSION_INPUT_PLACEHOLDER}
          value={value as string}
          onInput={input => {
            const val = (input.target as HTMLInputElement).value
            onChange?.(val, MultiTypeInputValue.STRING)
          }}
          data-mentions={mentionsType}
        />
      )}
      <Button
        noStyling
        className={cx(css.btn, css[type], btnClassName)}
        tooltip={menu}
        onClick={e => e.preventDefault()}
        tooltipProps={{
          minimal: true,
          position: Position.BOTTOM_RIGHT,
          interactionKind: PopoverInteractionKind.CLICK
        }}>
        <Icon name={TypeIcon[type]} size={12} color={Color.WHITE} />
      </Button>
    </Layout.Horizontal>
  )
}

export function MultiTypeInputFixedTypeComponent(
  props: FixedTypeComponentProps & Partial<MultiTypeInputProps['selectProps']>
) {
  const { onChange, value, ...selectProps } = props
  const { items = [] } = selectProps || {}
  return (
    <Select
      {...selectProps}
      className={css.select}
      items={items}
      value={value as SelectOption}
      onChange={(item: SelectOption) => onChange?.(item, MultiTypeInputValue.SELECT_OPTION)}
    />
  )
}

export interface MultiTypeInputProps
  extends Omit<ExpressionAndRuntimeTypeProps, 'fixedTypeComponent' | 'fixedTypeComponentProps'> {
  selectProps?: Omit<SelectProps, 'onChange' | 'value'>
}

export function MultiTypeInput({ selectProps, ...rest }: MultiTypeInputProps) {
  return (
    <ExpressionAndRuntimeType
      {...rest}
      fixedTypeComponentProps={selectProps}
      fixedTypeComponent={MultiTypeInputFixedTypeComponent}
    />
  )
}

function MultiTextInputFixedTypeComponent(props: FixedTypeComponentProps & MultiTextInputProps['textProps']) {
  const { onChange, value, ...rest } = props

  return (
    <InputGroup
      className={css.input}
      {...rest}
      value={value as string}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value, MultiTypeInputValue.STRING)
      }}
    />
  )
}

export interface MultiTextInputProps
  extends Omit<ExpressionAndRuntimeTypeProps, 'fixedTypeComponent' | 'fixedTypeComponentProps'> {
  textProps?: Omit<IInputGroupProps & HTMLInputProps, 'onChange' | 'value'>
}

export function MultiTextInput(props: MultiTextInputProps) {
  const { textProps, ...rest } = props
  return (
    <ExpressionAndRuntimeType
      {...rest}
      fixedTypeComponentProps={textProps}
      fixedTypeComponent={MultiTextInputFixedTypeComponent}
    />
  )
}

export function MultiSelectTypeInputTypeComponent(
  props: FixedTypeComponentProps & Partial<MultiSelectTypeInputProps['multiSelectProps']>
) {
  const { onChange, value, ...multiSelectProps } = props
  const { items = [] } = multiSelectProps || {}
  return (
    <MultiSelect
      {...multiSelectProps}
      items={items}
      value={value as MultiSelectOption[]}
      className={css.multiSelect}
      onChange={(item: MultiSelectOption[]) => onChange?.(item, MultiTypeInputValue.MULTI_SELECT_OPTION)}
    />
  )
}

export interface MultiSelectTypeInputProps
  extends Omit<ExpressionAndRuntimeTypeProps, 'fixedTypeComponent' | 'fixedTypeComponentProps'> {
  multiSelectProps?: Omit<MultiSelectProps, 'onChange' | 'value'>
}

export const MultiSelectTypeInput: React.FC<MultiSelectTypeInputProps> = ({ multiSelectProps, ...rest }) => {
  return (
    <ExpressionAndRuntimeType
      {...rest}
      fixedTypeComponentProps={multiSelectProps}
      fixedTypeComponent={MultiSelectTypeInputTypeComponent}
    />
  )
}
