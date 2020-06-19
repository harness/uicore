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
  FIXED = 'fixed',
  RUNTIME = 'runtime',
  EXPRESSION = 'expression'
}

const TypeIcon: Record<string, IconName> = {
  fixed: 'pin',
  runtime: 'derive-column',
  expression: 'code'
}

interface MultiTypeInputProps extends React.ComponentProps<typeof Container> {
  type?: MultiTypeInputType
  width?: number
  selectProps?: SelectProps
}

export const MultiTypeInput: React.FC<MultiTypeInputProps> = ({
  selectProps,
  width,
  type = MultiTypeInputType.FIXED
}) => {
  const [activeType, setActiveType] = useState<MultiTypeInputType>(type)
  const switchType = useCallback(
    (toType: MultiTypeInputType) => {
      setActiveType(toType)
    },
    [type]
  )
  const menu = (
    <Menu className={css.menu}>
      <Menu.Item
        labelElement={<Icon name={TypeIcon.fixed} color={Color.BLUE_500} />}
        text="Fixed value"
        onClick={() => switchType(MultiTypeInputType.FIXED)}
      />
      <Menu.Item
        labelElement={<Icon name={TypeIcon.runtime} color={Color.PURPLE_500} />}
        text="Runtime input"
        onClick={() => switchType(MultiTypeInputType.RUNTIME)}
      />
      <Menu.Item
        labelElement={<Icon name={TypeIcon.expression} color={Color.YELLOW_500} />}
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
        <TextInput style={{ width: inputWidth }} placeholder="{{ value }}" disabled />
      )}
      {activeType === MultiTypeInputType.EXPRESSION && (
        <TextInput style={{ width: inputWidth }} placeholder="${expression}" />
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
