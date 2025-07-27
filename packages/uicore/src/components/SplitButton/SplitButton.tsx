/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { MenuItemProps as MMenuItemProps, Menu, MenuItem, Position } from '@blueprintjs/core'
import cx from 'classnames'
import { PopoverProps } from 'components/Popover/Popover'
import React from 'react'
import { Button, ButtonProps, ButtonVariation, Color, HarnessDocTooltip, Icon, IconProps, Popover } from '../..'
import css from './SplitButton.css'

type SplitButtonProps = Omit<ButtonProps, 'rightIcon'> & {
  className?: string
  dropdownDisabled?: boolean
  popoverProps?: PopoverProps
  usePortal?: boolean
  variation?: ButtonVariation
  isDropdownOpen?: boolean
}

interface MenuItemProps extends MMenuItemProps {
  iconProps?: IconProps
}

export const SplitButton: React.FC<SplitButtonProps> = ({
  onClick,
  text,
  icon,
  children,
  className,
  tooltip,
  tooltipProps,
  disabled,
  dropdownDisabled,
  popoverProps,
  usePortal = false,
  variation,
  isDropdownOpen,
  ...commonProps
}) => {
  const [isOptionsOpen, setOptionsOpen] = React.useState(false)

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    onClick?.(event)
  }

  const childrenCount = React.Children.count(children)

  const renderPopover = (dropdownButtonProps?: ButtonProps) => {
    return (
      <Popover
        disabled={dropdownDisabled}
        isOpen={isOptionsOpen}
        onInteraction={nextOpenState => {
          setOptionsOpen(nextOpenState)
        }}
        content={<Menu>{children}</Menu>}
        usePortal={usePortal}
        minimal={true}
        fill={false}
        position={Position.BOTTOM_RIGHT}
        {...popoverProps}>
        <Button
          variation={variation}
          disabled={dropdownDisabled}
          rightIcon="chevron-down"
          className={cx(css.dropdown, className, 'border-left-0')}
          onClick={() => setOptionsOpen(true)}
          {...commonProps}
          {...dropdownButtonProps}
        />
      </Popover>
    )
  }

  if (variation === ButtonVariation.AI_PRIMARY || variation === ButtonVariation.AI_SECONDARY) {
    return (
      <div className={css.splitButton}>
        <Button
          withoutCurrentColor
          variation={variation}
          {...commonProps}
          tooltip={tooltip}
          disabled={disabled}
          onClick={e => {
            if (!isOptionsOpen) {
              handleClick(e)
            }
          }}
          text={text}
          icon={icon}>
          <Icon
            margin={{ left: 'xsmall' }}
            size={16}
            className={css.aiIcon}
            name={variation === ButtonVariation.AI_PRIMARY ? 'ai-primary' : 'ai-secondary'}
          />
          {childrenCount > 0 &&
            renderPopover({
              variation: ButtonVariation.ICON,
              withoutCurrentColor: true,
              className: cx(css.dropdown, css.aiDropdownButton),
              iconProps: { name: 'chevron-down', color: Color.AI_PURPLE_500 },
              onClick: e => {
                e.stopPropagation()
                setOptionsOpen(true)
              }
            })}
        </Button>
        <HarnessDocTooltip tooltipId={tooltipProps?.dataTooltipId} useStandAlone={true} />
      </div>
    )
  }

  return (
    <div className={css.splitButton}>
      <Button
        {...commonProps}
        variation={variation}
        tooltip={tooltip}
        disabled={disabled}
        onClick={handleClick}
        text={text}
        icon={icon}
        className={cx({ [css.main]: childrenCount }, 'border-right-0')}
      />
      {childrenCount > 0 && renderPopover()}
      <HarnessDocTooltip tooltipId={tooltipProps?.dataTooltipId} useStandAlone={true} />
    </div>
  )
}

export const SplitButtonOption: React.FC<MenuItemProps & { className?: string }> = ({
  onClick,
  icon,
  text,
  className,
  disabled,
  iconProps
}) => {
  const iconElement = iconProps ? <Icon size={16} className={css.iconMenuItem} {...iconProps} /> : icon

  return (
    <MenuItem
      icon={iconElement}
      onClick={onClick}
      text={text}
      className={cx(css.splitButtonOption, className)}
      disabled={disabled}
    />
  )
}
