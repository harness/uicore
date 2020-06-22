import React, { useState, useEffect, useCallback } from 'react'
import { Container } from '../Container/Container'
import { Button } from '../Button/Button'
import { Select, SelectProps } from '../Select/Select'
import { TextInput } from '../TextInput/TextInput'
import { Layout } from '../../layouts/Layout'
import css from './MultiTypeInput.css'
import { Icon, IconName } from '../../icons/Icon'
import { Color } from '../../core/Color'
import { Position, Menu, PopoverInteractionKind } from '@blueprintjs/core'
import cx from 'classnames'

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

interface MultiTypeInputProps extends React.ComponentProps<typeof Container> {
  value?: string
  width?: number
  selectProps?: SelectProps
  onTypeChanged?: (type: MultiTypeInputType) => void
}

const valueToType = (value = ''): MultiTypeInputType => {
  value = value.toLocaleLowerCase()

  if (value === '{input}') return MultiTypeInputType.RUNTIME
  if (value.startsWith('${') && value.endsWith('}')) return MultiTypeInputType.EXPRESSION

  return MultiTypeInputType.FIXED
}

export const MultiTypeInput: React.FC<MultiTypeInputProps> = ({ value, selectProps, width, onTypeChanged }) => {
  const [type, setType] = useState<MultiTypeInputType>(valueToType(value))
  const switchType = useCallback(
    (newType: MultiTypeInputType) => {
      setType(newType)
      onTypeChanged?.(newType)
    },
    [type]
  )
  const menu = (
    <Menu className={css.menu}>
      <Menu.Item
        labelElement={<Icon name={TypeIcon.FIXED} color={Color.BLUE_500} />}
        text="Fixed value"
        onClick={() => switchType(MultiTypeInputType.FIXED)}
      />
      <Menu.Item
        labelElement={<Icon name={TypeIcon.RUNTIME} color={Color.PURPLE_500} />}
        text="Runtime input"
        onClick={() => switchType(MultiTypeInputType.RUNTIME)}
      />
      <Menu.Item
        labelElement={<Icon name={TypeIcon.EXPRESSION} color={Color.YELLOW_500} />}
        text="Expression"
        onClick={() => switchType(MultiTypeInputType.EXPRESSION)}
      />
    </Menu>
  )

  useEffect(() => {
    valueToType(value)
  }, [value])

  const inputWidth = width && width - 28

  return (
    <Layout.Horizontal width={width}>
      {type === MultiTypeInputType.FIXED && (
        <Select
          className={css.select}
          items={[
            { label: 'Kubernetes', value: 'service-kubernetes' },
            { label: 'GitHub', value: 'service-github' },
            { label: 'ELK', value: 'service-elk' },
            { label: 'Jenkins', value: 'service-jenkins' },
            { label: 'GCP', value: 'service-gcp' }
          ]}
          {...selectProps}
          value={{ label: 'Kubernetes', value: 'service-kubernetes' }}
        />
      )}
      {type === MultiTypeInputType.RUNTIME && (
        <TextInput className={css.input} style={{ width: inputWidth }} placeholder="{input}" disabled value={value} />
      )}
      {type === MultiTypeInputType.EXPRESSION && (
        <TextInput className={css.input} style={{ width: inputWidth }} placeholder="${expression}" value={value} />
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
