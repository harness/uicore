import React from 'react'
import { Card as BpCard, ICardProps, HTMLDivProps, Position } from '@blueprintjs/core'
import css from './Card.css'
import cx from 'classnames'
import { Icon as UiIcon, IconName, IconProps } from '../../icons/Icon'
import { Color } from '../../core/Color'
import { Popover } from '../../components/Popover/Popover'
import { Text } from '../../components/Text/Text'

export interface CardProps extends ICardProps {
  selected?: boolean
}

export const Card: React.FC<CardProps> = props => {
  const { selected = false, className = '', style, tabIndex = 0, ...bpProps } = props
  const tabIndexProps = bpProps.interactive ? { tabIndex } : {}
  return (
    <BpCard
      {...bpProps}
      {...tabIndexProps}
      className={cx(css.card, className, { [css.selected]: selected })}
      style={style}>
      {props.children}
    </BpCard>
  )
}

// Card Body
interface CardIconProps extends HTMLDivProps {
  icon: IconName
  iconSize?: number
  iconProps?: Partial<IconProps>
}

const Icon: React.FC<CardIconProps> = props => {
  const { icon, iconSize = 16, iconProps = {}, className, style } = props

  return (
    <div className={cx(css.cardIcon, className)} style={style}>
      <UiIcon name={icon} size={iconSize} {...iconProps} />
      {props.children}
    </div>
  )
}

interface CardMenuProps extends HTMLDivProps {
  menuContent: JSX.Element
  title?: string
  colorIdentifier?: Color
}

const Menu: React.FC<CardMenuProps> = props => {
  const { menuContent, title, colorIdentifier = false, className, style = {} } = props

  return (
    <div
      className={cx(css.cardMenu, className, { [css.colorIdentifier]: colorIdentifier })}
      style={{ color: colorIdentifier ? colorIdentifier : '', ...style }}>
      <div className={css.dots}>
        <Popover content={menuContent} position={Position.RIGHT_TOP}>
          <UiIcon className={css.menu} name="more" size={16} padding="small" />
        </Popover>
      </div>
      {title && (
        <Text className={css.title} font="medium">
          {title}
        </Text>
      )}
      {props.children}
    </div>
  )
}

export const CardBody = { Icon, Menu }
