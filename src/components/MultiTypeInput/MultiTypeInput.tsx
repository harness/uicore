import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '../Button/Button'
import { Select, SelectProps } from '../Select/Select'
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

export enum MultiTypeInputType {
  FIXED = 'FIXED',
  RUNTIME = 'RUNTIME',
  EXPRESSION = 'EXPRESSION'
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

interface MultiTypeInputProps extends Omit<LayoutProps, 'onChange'> {
  value?: string
  width?: number
  selectProps?: SelectProps
  mentionsInfo?: Partial<MentionsInfo>
  onTypeChange?: (type: MultiTypeInputType) => void
  onChange?: (value: string) => void
  i18n?: I18nResource
}

const isValueAnExpression = (value: string) => value.startsWith('${') && value.endsWith('}')

const valueToType = (value = ''): MultiTypeInputType => {
  value = value.toLocaleLowerCase().trim()

  if (value === RUNTIME_INPUT_VALUE) return MultiTypeInputType.RUNTIME
  if (isValueAnExpression(value)) return MultiTypeInputType.EXPRESSION

  return MultiTypeInputType.FIXED
}

export const MultiTypeInput: React.FC<MultiTypeInputProps> = ({
  value,
  width,
  selectProps = {},
  mentionsInfo,
  onTypeChange: onTypeChanged,
  onChange,
  i18n: _i18n = {},
  ...layoutProps
}) => {
  const i18n = useMemo(() => Object.assign({}, i18nBase, _i18n), [_i18n])
  const [type, setType] = useState<MultiTypeInputType>(valueToType(value))
  const [inputValue, setInputValue] = useState(value)
  const [mentionsType] = useState(`multi-type-input-${Utils.randomId()}`)
  const switchType = useCallback(
    (newType: MultiTypeInputType) => {
      setType(newType)
      onTypeChanged?.(newType)
      const _inputValue = newType === MultiTypeInputType.RUNTIME ? RUNTIME_INPUT_VALUE : ''
      setInputValue(_inputValue)
      onChange?.(_inputValue)
    },
    [type]
  )
  const inputWidth = width && width - 28
  const { items = [] } = selectProps
  const menu = useMemo(
    () => (
      <Menu className={css.menu}>
        <Menu.Item
          labelElement={<Icon name={TypeIcon.FIXED} color={Color.BLUE_500} />}
          text={i18n.fixedValue}
          onClick={() => switchType(MultiTypeInputType.FIXED)}
        />
        <Menu.Item
          labelElement={<Icon name={TypeIcon.RUNTIME} color={Color.PURPLE_500} />}
          text={i18n.runtimeInput}
          onClick={() => switchType(MultiTypeInputType.RUNTIME)}
        />
        <Menu.Item
          labelElement={<Icon name={TypeIcon.EXPRESSION} color={Color.YELLOW_500} />}
          text={i18n.expression}
          onClick={() => switchType(MultiTypeInputType.EXPRESSION)}
        />
      </Menu>
    ),
    []
  )

  useEffect(() => {
    valueToType(value)
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
    <Layout.Horizontal width={width} {...layoutProps}>
      {type === MultiTypeInputType.FIXED && (
        <Select
          className={css.select}
          items={items}
          {...selectProps}
          onChange={item => {
            const val = String(item.value)
            setInputValue(val)
            onChange?.(val)
          }}
        />
      )}
      {type === MultiTypeInputType.RUNTIME && (
        <TextInput
          className={css.input}
          style={{ width: inputWidth }}
          placeholder={RUNTIME_INPUT_VALUE}
          disabled
          value={inputValue}
        />
      )}
      {type === MultiTypeInputType.EXPRESSION && (
        <TextInput
          className={css.input}
          style={{ width: inputWidth }}
          placeholder={EXPRESSION_INPUT_PLACEHOLDER}
          value={inputValue}
          onInput={input => {
            const val = (input.target as HTMLInputElement).value
            setInputValue(val)
            onChange?.(val)
          }}
          data-mentions={mentionsType}
        />
      )}
      <Button
        noStyling
        className={cx(css.btn, css[type])}
        tooltip={menu}
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
