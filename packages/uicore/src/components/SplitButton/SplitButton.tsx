/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { IMenuItemProps, Menu, MenuItem, Position } from '@blueprintjs/core'
import cx from 'classnames'
import React, { MouseEvent } from 'react'
import { Button, ButtonProps, Popover } from '../..'
import css from './SplitButton.css'

type SplitButtonProps = Omit<ButtonProps, 'rightIcon'> & { className?: string; dropdownDisabled?: boolean }

export const SplitButton: React.FC<SplitButtonProps> = ({
  onClick,
  text,
  icon,
  children,
  className,
  tooltipProps,
  disabled,
  dropdownDisabled,
  ...commonProps
}) => {
  const [isOptionsOpen, setOptionsOpen] = React.useState(false)

  const handleClick = async (event: MouseEvent) => {
    onClick?.(event)
  }

  return (
    <div className={css.splitButton}>
      <Button
        {...commonProps}
        disabled={disabled}
        onClick={handleClick}
        text={text}
        icon={icon}
        className={cx(css.main, 'border-right-0')}
      />
      <Popover
        disabled={dropdownDisabled}
        isOpen={isOptionsOpen}
        onInteraction={nextOpenState => {
          setOptionsOpen(nextOpenState)
        }}
        content={<Menu>{children}</Menu>}
        usePortal={false}
        minimal={true}
        fill={false}
        position={Position.BOTTOM_RIGHT}>
        <Button
          disabled={dropdownDisabled}
          rightIcon="chevron-down"
          tooltipProps={tooltipProps}
          {...commonProps}
          onClick={() => setOptionsOpen(true)}
          className={cx(css.dropdown, className, 'border-left-0')}
        />
      </Popover>
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
