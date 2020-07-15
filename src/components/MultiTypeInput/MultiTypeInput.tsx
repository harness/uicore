import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '../Button/Button'
import { Select, SelectProps, SelectOption } from '../Select/Select'
import { TextInput } from '../TextInput/TextInput'
import { Layout, LayoutProps } from '../../layouts/Layout'
import css from './MultiTypeInput.css'
import { Icon, IconName } from '../../icons/Icon'
import { Color } from '../../core/Color'
import { Position, Menu, PopoverInteractionKind } from '@blueprintjs/core'
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
  SELECTOPTION = 'SELECT_OPTION',
  MULTISELECTOPTION = 'MULTI_SELECT_OPTION'
}

const TypeIcon: Record<string, IconName> = {
  FIXED: 'fixed-input',
  RUNTIME: 'runtime-input',
  EXPRESSION: 'expression-input'
}

const RUNTIME_INPUT_VALUE = '{input}'
const EXPRESSION_INPUT_PLACEHOLDER = '${expression}'
const MENTIONS_DEFAULT: MentionsInfo = {
  identifiersSet: /[A-Za-z0-9_.'"\(\)]/, // eslint-disable-line no-useless-escape
  trigger: ['$', '${'],
  rule: '${__match__}',
  cached: true,
  data: done => done([])
}

type AcceptableValue = string | SelectOption | MultiSelectOption[]

interface ExpressionAndRuntimeTypeProps extends Omit<LayoutProps, 'onChange'> {
  value?: AcceptableValue
  width?: number
  mentionsInfo?: Partial<MentionsInfo>
  onTypeChange?: (type: MultiTypeInputType) => void
  onChange?: (value: string | SelectOption | MultiSelectOption[] | undefined, type: MultiTypeInputValue) => void
  i18n?: I18nResource
  allowableTypes?: MultiTypeInputType[]
  fixedTypeComponent: (props: FixedTypeComponentProps) => JSX.Element
}

type FixedTypeComponentProps = { onChange: ExpressionAndRuntimeTypeProps['onChange'] }

export interface MultiTypeInputProps
  extends Omit<ExpressionAndRuntimeTypeProps, 'fixedTypeComponent' | 'fixedComponentValueType'> {
  selectProps?: SelectProps
}

export interface MultiSelectTypeInputProps
  extends Omit<ExpressionAndRuntimeTypeProps, 'fixedTypeComponent' | 'fixedComponentValueType'> {
  multiSelectProps: MultiSelectProps
}

const isValueAnExpression = (value: string) => value.startsWith('${') && value.endsWith('}')

const valueToType = (
  value: AcceptableValue | undefined = '',
  allowableTypes?: MultiTypeInputType[]
): MultiTypeInputType => {
  if (typeof value === 'string') {
    value = value.toLocaleLowerCase().trim()
    if (value === RUNTIME_INPUT_VALUE) return MultiTypeInputType.RUNTIME
    if (isValueAnExpression(value)) return MultiTypeInputType.EXPRESSION
  }
  if (!value && allowableTypes?.length) {
    return allowableTypes[0]
  }
  return MultiTypeInputType.FIXED
}

function ExpressionAndRuntimeType({
  value,
  width,
  mentionsInfo,
  onTypeChange: onTypeChanged,
  onChange,
  i18n: _i18n = {},
  fixedTypeComponent,
  allowableTypes,
  ...layoutProps
}: ExpressionAndRuntimeTypeProps) {
  const i18n = useMemo(() => Object.assign({}, i18nBase, _i18n), [_i18n])
  const [type, setType] = useState<MultiTypeInputType>(valueToType(value))
  const [inputValue, setInputValue] = useState<ExpressionAndRuntimeTypeProps['value']>(value)
  const [mentionsType] = useState(`multi-type-input-${Utils.randomId()}`)
  const allowedTypes = useMemo(() => {
    return allowableTypes?.length
      ? allowableTypes
      : [MultiTypeInputType.FIXED, MultiTypeInputType.RUNTIME, MultiTypeInputType.EXPRESSION]
  }, [allowableTypes])
  const switchType = useCallback(
    (newType: MultiTypeInputType) => {
      setType(newType)
      onTypeChanged?.(newType)
      const _inputValue = newType === MultiTypeInputType.RUNTIME ? RUNTIME_INPUT_VALUE : undefined
      setInputValue(_inputValue)
      onChange?.(_inputValue, MultiTypeInputValue.STRING)
    },
    [type]
  )
  const inputWidth = width && width - 28
  const FixedTypeComponent = fixedTypeComponent
  const fixedComponentOnChangeCallback = useCallback((val, multiTypeInputValue: MultiTypeInputValue) => {
    setInputValue(val)
    onChange?.(val, multiTypeInputValue)
  }, [])
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
    // valueToType(value)
    setInputValue(value)
  }, [value])

  useEffect(() => {
    if (type === MultiTypeInputType.EXPRESSION) {
      unregister(mentionsType)
      register(mentionsType, Object.assign({}, MENTIONS_DEFAULT, mentionsInfo))
    }
    return () => unregister(mentionsType)
  }, [type])

  return (
    <Layout.Horizontal className={css.main} width={width} {...layoutProps}>
      {type === MultiTypeInputType.FIXED && <FixedTypeComponent onChange={fixedComponentOnChangeCallback} />}
      {type === MultiTypeInputType.RUNTIME && (
        <TextInput
          className={css.input}
          style={{ width: inputWidth }}
          placeholder={RUNTIME_INPUT_VALUE}
          disabled
          value={inputValue as string}
        />
      )}
      {type === MultiTypeInputType.EXPRESSION && (
        <TextInput
          className={css.input}
          style={{ width: inputWidth }}
          placeholder={EXPRESSION_INPUT_PLACEHOLDER}
          value={inputValue as string}
          onInput={input => {
            const val = (input.target as HTMLInputElement).value
            setInputValue(val)
            onChange?.(val, MultiTypeInputValue.STRING)
          }}
          data-mentions={mentionsType}
        />
      )}
      <Button
        noStyling
        className={cx(css.btn, css[type])}
        tooltip={menu}
        onClick={e => e.preventDefault()}
        tooltipProps={{
          minimal: true,
          position: Position.BOTTOM_RIGHT,
          interactionKind: PopoverInteractionKind.CLICK
        }}>
        <Icon name={TypeIcon[type]} size={14} color={Color.WHITE} />
      </Button>
    </Layout.Horizontal>
  )
}

export const MultiTypeInput: React.FC<MultiTypeInputProps> = ({ selectProps, ...rest }) => {
  const fixedTypeComponent = useCallback(
    (props: FixedTypeComponentProps) => {
      const { onChange } = props
      const { items = [] } = selectProps || {}
      const onChangeCallback = useCallback(
        (item: SelectOption) => onChange?.(item, MultiTypeInputValue.SELECTOPTION),
        []
      )
      return <Select className={css.select} items={items} {...selectProps} onChange={onChangeCallback} />
    },
    [selectProps]
  )
  return <ExpressionAndRuntimeType {...rest} fixedTypeComponent={fixedTypeComponent} />
}

export const MultiSelectTypeInput: React.FC<MultiSelectTypeInputProps> = ({ multiSelectProps, ...rest }) => {
  const fixedTypeComponent = useCallback(
    (props: FixedTypeComponentProps) => {
      const { onChange } = props
      const { items = [] } = multiSelectProps || {}
      const onChangeCallback = useCallback(
        (item: MultiSelectOption[]) => onChange?.(item, MultiTypeInputValue.MULTISELECTOPTION),
        []
      )
      return <MultiSelect {...multiSelectProps} items={items} onChange={onChangeCallback} />
    },
    [multiSelectProps]
  )

  return <ExpressionAndRuntimeType {...rest} fixedTypeComponent={fixedTypeComponent} />
}
