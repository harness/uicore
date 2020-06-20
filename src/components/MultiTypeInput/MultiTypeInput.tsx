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
  FIXED: 'pin',
  RUNTIME: 'derive-column',
  EXPRESSION: 'code'
}

interface MultiTypeInputProps extends React.ComponentProps<typeof Container> {
  type?: MultiTypeInputType
  width?: number
  selectProps?: SelectProps
  onTypeChanged?: (type: MultiTypeInputType) => void
}

export const MultiTypeInput: React.FC<MultiTypeInputProps> = ({
  selectProps,
  width,
  type = MultiTypeInputType.FIXED,
  onTypeChanged
}) => {
  const [activeType, setActiveType] = useState<MultiTypeInputType>(type)
  const switchType = useCallback(
    (newType: MultiTypeInputType) => {
      setActiveType(newType)
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
    setActiveType(type)
  }, [type])

  const inputWidth = width && width - 28

  return (
    <Layout.Horizontal width={width}>
      {activeType === MultiTypeInputType.FIXED && (
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
        />
      )}
      {activeType === MultiTypeInputType.RUNTIME && (
        <TextInput className={css.input} style={{ width: inputWidth }} placeholder="{input}" disabled />
      )}
      {activeType === MultiTypeInputType.EXPRESSION && (
        <TextInput className={css.input} style={{ width: inputWidth }} placeholder="${expression}" />
      )}
      <Button
        noStyling
        className={cx(css.btn, css[activeType])}
        tooltip={menu}
        tooltipProps={{
          minimal: true,
          position: Position.BOTTOM_RIGHT,
          interactionKind: PopoverInteractionKind.CLICK
        }}>
        <Icon name={TypeIcon[activeType]} size={14} color={Color.WHITE} />
      </Button>
    </Layout.Horizontal>
  )
}
