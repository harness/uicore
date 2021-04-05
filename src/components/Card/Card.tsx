import React, { useCallback } from 'react'
import { Card as BpCard, ICardProps, HTMLDivProps, Position } from '@blueprintjs/core'
import css from './Card.css'
import cx from 'classnames'
import { Icon as UiIcon, IconName, IconProps } from '../../icons/Icon'
import { Color } from '../../core/Color'
import { Popover, PopoverProps } from '../../components/Popover/Popover'
import { Text } from '../../components/Text/Text'
import { Button } from '../../components/Button/Button'

export interface CardProps extends ICardProps {
  selected?: boolean
  disabled?: boolean
  cornerSelected?: boolean
}

const renderCornerTick = () => {
  return (
    <span className={css.corner}>
      <span className={css.badge}></span>
      <UiIcon name="tick" size={9} color={'white'} />
    </span>
  )
}

export const Card: React.FC<CardProps> = props => {
  const {
    selected = false,
    disabled = false,
    className = '',
    style,
    cornerSelected = false,
    tabIndex = 0,
    ...bpProps
  } = props
  // if card is disabled then interactivity should be false
  if (disabled) {
    bpProps.interactive = false
  }
  const tabIndexProps = bpProps.interactive ? { tabIndex } : {}
  const onClick = useCallback(
    event => {
      if (!event.target.closest(`.${css.dots}`)) {
        props.onClick?.(event)
      }
    },
    [props.onClick]
  )

  return (
    <BpCard
      {...bpProps}
      {...tabIndexProps}
      className={cx(
        css.card,
        className,
        { [css.selected]: selected },
        { [css.disabled]: disabled },
        { [css.interactive]: bpProps.interactive }
      )}
      style={style}
      onClick={onClick}>
      {selected && cornerSelected && renderCornerTick()}
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

export const Icon: React.FC<CardIconProps> = props => {
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
  menuPopoverProps?: PopoverProps
}

export const Menu: React.FC<CardMenuProps> = props => {
  const { menuContent, title, colorIdentifier = false, className, style = {}, menuPopoverProps } = props
  // NextJS does not work well with usePortal={true}
  const isNext =
    typeof window !== 'undefined' && typeof window.next !== 'undefined' && typeof window.__NEXT_DATA__ !== 'undefined'

  return (
    <div
      className={cx(css.cardMenu, className, { [css.colorIdentifier]: colorIdentifier })}
      style={{ color: colorIdentifier ? colorIdentifier : '', ...style }}>
      <div className={css.dots}>
        <Popover content={menuContent} position={Position.RIGHT_TOP} usePortal={!isNext} {...menuPopoverProps}>
          <Button className={css.menu} minimal round icon="Options" />
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
