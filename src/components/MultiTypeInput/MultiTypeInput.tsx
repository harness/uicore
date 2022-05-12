/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Button } from '../Button/Button'
import { Select, SelectProps, SelectOption } from '../Select/Select'
import { TextInput } from '../TextInput/TextInput'
import { Layout, LayoutProps } from '../../layouts/Layout'
import css from './MultiTypeInput.css'
import { Icon } from '@harness/icons'
import { Position, PopoverInteractionKind, IInputGroupProps, InputGroup, HTMLInputProps } from '@blueprintjs/core'
import cx from 'classnames'
import i18nBase from './MultiTypeInput.i18n'
import { I18nResource } from '@harness/design-system'
import { Utils } from '../../core/Utils'
import { MultiSelectOption, MultiSelectProps, MultiSelect } from '../MultiSelect/MultiSelect'
import { ExpressionInput } from '../ExpressionInput/ExpressionInput'
import {
  MultiTypeInputType,
  MultiTypeInputValue,
  MultiTypeIcon,
  MultiTypeIconSize,
  RUNTIME_INPUT_VALUE,
  EXPRESSION_INPUT_PLACEHOLDER
} from './MultiTypeInputUtils'
import { MultiTypeInputMenu } from './MultiTypeInputMenu'

type AcceptableValue = boolean | string | number | SelectOption | string[] | MultiSelectOption[]

export interface ExpressionAndRuntimeTypeProps<T = unknown> extends Omit<LayoutProps, 'onChange'> {
  value?: AcceptableValue
  multitypeInputValue?: MultiTypeInputType
  defaultValueToReset?: AcceptableValue
  width?: number
  expressions?: string[]
  onTypeChange?: (type: MultiTypeInputType) => void
  onChange?: (value: AcceptableValue | undefined, valueType: MultiTypeInputValue, type: MultiTypeInputType) => void
  i18n?: I18nResource
  btnClassName?: string
  allowableTypes?: MultiTypeInputType[]
  fixedTypeComponent: (props: FixedTypeComponentProps & T) => JSX.Element
  fixedTypeComponentProps?: T
  name: string
  disabled?: boolean
  mini?: boolean
}

export interface FixedTypeComponentProps {
  onChange: ExpressionAndRuntimeTypeProps['onChange']
  value?: AcceptableValue
  disabled?: boolean
}

export const isValueAnExpression = (value: string): boolean => /<\+.*>/.test(value)

export const getMultiTypeFromValue = (
  value: AcceptableValue | undefined = '',
  allowableTypes?: MultiTypeInputType[],
  supportListOfExpressionsBehaviour?: boolean
): MultiTypeInputType => {
  if (typeof value === 'boolean') {
    return MultiTypeInputType.FIXED
  } else if (typeof value === 'string') {
    value = value.toLocaleLowerCase().trim()
    if (value.startsWith(RUNTIME_INPUT_VALUE)) return MultiTypeInputType.RUNTIME
    if (isValueAnExpression(value)) return MultiTypeInputType.EXPRESSION
  } else if (Array.isArray(value) && supportListOfExpressionsBehaviour) {
    // To support list of expressions
    if (value.some((item: string | MultiSelectOption) => typeof item === 'string' && isValueAnExpression(item)))
      return MultiTypeInputType.EXPRESSION
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
    expressions = [],
    onTypeChange,
    onChange,
    i18n: _i18n = {},
    fixedTypeComponent,
    fixedTypeComponentProps,
    btnClassName = '',
    allowableTypes = [MultiTypeInputType.FIXED, MultiTypeInputType.RUNTIME, MultiTypeInputType.EXPRESSION],
    name,
    disabled,
    multitypeInputValue,
    mini,
    ...layoutProps
  } = props
  const i18n = useMemo(() => Object.assign({}, i18nBase, _i18n), [_i18n])
  const [type, setType] = useState<MultiTypeInputType>(getMultiTypeFromValue(value))
  const [mentionsType] = useState(`multi-type-input-${Utils.randomId()}`)
  const switchType = (newType: MultiTypeInputType) => {
    if (type !== newType) {
      setType(newType)
      onTypeChange?.(newType)
      const _inputValue = newType === MultiTypeInputType.RUNTIME ? RUNTIME_INPUT_VALUE : defaultValueToReset
      onChange?.(_inputValue, MultiTypeInputValue.STRING, newType)
    }
  }

  const FixedTypeComponent = fixedTypeComponent
  const fixedComponentOnChangeCallback = useCallback(
    (val, multiTypeInputValue: MultiTypeInputValue) => {
      onChange?.(val, multiTypeInputValue, MultiTypeInputType.FIXED)
    },
    [onChange]
  )

  useEffect(() => {
    if (multitypeInputValue !== undefined) {
      setType(multitypeInputValue)
    }
  }, [multitypeInputValue])

  return (
    <Layout.Horizontal
      className={cx(mini ? css.mini : css.main, {
        [css.disabled]: type === MultiTypeInputType.RUNTIME || disabled
      })}
      width={width}
      {...layoutProps}>
      {type === MultiTypeInputType.FIXED && (
        <FixedTypeComponent
          {...(fixedTypeComponentProps as T)}
          value={value}
          disabled={disabled}
          onChange={fixedComponentOnChangeCallback}
        />
      )}
      {type === MultiTypeInputType.RUNTIME && (
        <TextInput
          wrapperClassName={css.input}
          name={name}
          placeholder={RUNTIME_INPUT_VALUE}
          disabled
          value={value as string}
        />
      )}
      {type === MultiTypeInputType.EXPRESSION && (
        <ExpressionInput
          popoverProps={{
            className: css.input
          }}
          name={name}
          items={expressions}
          inputProps={{ placeholder: EXPRESSION_INPUT_PLACEHOLDER }}
          value={value as string}
          disabled={disabled}
          onChange={val => {
            onChange?.(val, MultiTypeInputValue.STRING, MultiTypeInputType.EXPRESSION)
          }}
          data-mentions={mentionsType}
        />
      )}
      {!allowableTypes.length ||
      (allowableTypes.length === 1 && allowableTypes[0] === MultiTypeInputType.FIXED) ? null : (
        <Button
          noStyling
          className={cx(mini ? css.miniBtn : css.btn, css[type], btnClassName)}
          tooltip={
            disabled ? undefined : (
              <MultiTypeInputMenu i18n={i18n} onTypeSelect={switchType} allowedTypes={allowableTypes} />
            )
          }
          onClick={ev => {
            // if ((ev.nativeEvent as PointerEvent).pointerType !== 'mouse') {
            //   /*
            //   PIE-1755
            //   https://github.com/palantir/blueprint/issues/3856
            //   Button attached next to an InputGroup triggers the click event when enter key is pressed while typing
            //   So checking the event pointer type, and stopping the propagation if not clicked by the user
            //   */
            //   ev.stopPropagation()
            // }
            ev.preventDefault()
          }}
          disabled={disabled}
          tooltipProps={{
            minimal: true,
            position: Position.BOTTOM_RIGHT,
            interactionKind: PopoverInteractionKind.CLICK,
            popoverClassName: css.popover,
            className: css.wrapper,
            lazy: true
          }}>
          <Icon name={MultiTypeIcon[type]} size={MultiTypeIconSize[type]} />
        </Button>
      )}
    </Layout.Horizontal>
  )
}

export function MultiTypeInputFixedTypeComponent(
  props: FixedTypeComponentProps & Partial<MultiTypeInputProps['selectProps']>
): React.ReactElement {
  const { onChange, value, disabled, ...selectProps } = props
  const { items = [] } = selectProps || {}
  return (
    <Select
      {...selectProps}
      className={cx(css.select, selectProps.className, {
        [css.fixedValueInput]: MultiTypeInputType.FIXED ? true : false
      })}
      items={items}
      value={value as SelectOption}
      disabled={disabled}
      onChange={(item: SelectOption) => onChange?.(item, MultiTypeInputValue.SELECT_OPTION, MultiTypeInputType.FIXED)}
    />
  )
}

export interface MultiTypeInputProps
  extends Omit<ExpressionAndRuntimeTypeProps, 'fixedTypeComponent' | 'fixedTypeComponentProps'> {
  selectProps?: Omit<SelectProps, 'onChange' | 'value'>
}

export function MultiTypeInput({ selectProps, ...rest }: MultiTypeInputProps): React.ReactElement {
  return (
    <ExpressionAndRuntimeType
      {...rest}
      fixedTypeComponentProps={selectProps}
      fixedTypeComponent={MultiTypeInputFixedTypeComponent}
    />
  )
}

function MultiTextInputFixedTypeComponent(props: FixedTypeComponentProps & MultiTextInputProps['textProps']) {
  const { onChange, value, disabled, ...rest } = props

  return (
    <InputGroup
      className={css.input}
      {...rest}
      value={value as string}
      disabled={disabled}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value, MultiTypeInputValue.STRING, MultiTypeInputType.FIXED)
      }}
    />
  )
}

export interface MultiTextInputProps
  extends Omit<ExpressionAndRuntimeTypeProps, 'fixedTypeComponent' | 'fixedTypeComponentProps'> {
  textProps?: Omit<IInputGroupProps & HTMLInputProps, 'onChange' | 'value'>
}

export function MultiTextInput(props: MultiTextInputProps): React.ReactElement {
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
): React.ReactElement {
  const { onChange, value, disabled, ...multiSelectProps } = props
  const { items = [] } = multiSelectProps || {}
  return (
    <MultiSelect
      {...multiSelectProps}
      items={items}
      value={value as MultiSelectOption[]}
      className={cx(css.multiSelect, multiSelectProps.className)}
      disabled={disabled}
      onChange={(item: MultiSelectOption[]) =>
        onChange?.(item, MultiTypeInputValue.MULTI_SELECT_OPTION, MultiTypeInputType.FIXED)
      }
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
