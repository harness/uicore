/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback } from 'react'
import { Card as BpCard, ICardProps, HTMLDivProps, Position } from '@blueprintjs/core'
import css from './Card.css'
import cx from 'classnames'
import { Icon as UiIcon, IconName, IconProps } from '@harness/icons'
import { Color } from '@harness/design-system'
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
      <UiIcon name="main-tick" size={10} color={'white'} />
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
      onClick={disabled ? undefined : onClick}>
      {selected && cornerSelected && renderCornerTick()}
      {props.children}
    </BpCard>
  )
}

// Card Body
export interface CardIconProps extends HTMLDivProps {
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

export interface CardMenuProps extends HTMLDivProps {
  menuContent: JSX.Element
  title?: string
  colorIdentifier?: Color
  menuPopoverProps?: PopoverProps
  menuHoverText?: string
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
          <Button
            className={css.menu}
            minimal
            round
            icon="more"
            tooltip={props.menuHoverText}
            tooltipProps={{ isDark: true }}
          />
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
