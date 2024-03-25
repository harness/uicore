/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IMenuItemProps, Menu, MenuItem, Position } from '@blueprintjs/core'
import cx from 'classnames'
import { PopoverProps } from 'components/Popover/Popover'
import React, { MouseEvent } from 'react'
import { Button, ButtonProps, HarnessDocTooltip, Popover } from '../..'
import css from './SplitButton.css'

type SplitButtonProps = Omit<ButtonProps, 'rightIcon'> & {
  className?: string
  dropdownDisabled?: boolean
  popoverProps?: PopoverProps
  usePortal?: boolean
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
  ...commonProps
}) => {
  const [isOptionsOpen, setOptionsOpen] = React.useState(false)

  const handleClick = async (event: MouseEvent) => {
    onClick?.(event)
  }

  const childrenCount = React.Children.count(children)

  return (
    <div className={css.splitButton}>
      <Button
        {...commonProps}
        tooltip={tooltip}
        disabled={disabled}
        onClick={handleClick}
        text={text}
        icon={icon}
        className={cx({ [css.main]: childrenCount }, 'border-right-0')}
      />
      {childrenCount > 0 && (
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
            disabled={dropdownDisabled}
            rightIcon="chevron-down"
            {...commonProps}
            onClick={() => setOptionsOpen(true)}
            className={cx(css.dropdown, className, 'border-left-0')}
          />
        </Popover>
      )}
      <HarnessDocTooltip tooltipId={tooltipProps?.dataTooltipId} useStandAlone={true} />
    </div>
  )
}

export const SplitButtonOption: React.FC<IMenuItemProps & { className?: string }> = ({
  onClick,
  icon,
  text,
  className,
  disabled
}) => {
  return (
    <MenuItem
      icon={icon}
      onClick={onClick}
      text={text}
      className={cx(css.splitButtonOption, className)}
      disabled={disabled}
    />
  )
}
