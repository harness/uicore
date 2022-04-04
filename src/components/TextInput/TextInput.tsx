/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import { InputGroup, IInputGroupProps, Intent } from '@blueprintjs/core'
import { Popover, PopoverProps } from '../Popover/Popover'
import { IconName, Icon, IconProps } from '@harness/icons'
import { Text } from '../Text/Text'

import css from './TextInput.css'
import { FormError } from '../FormError/FormError'

export interface TextInputProps
  extends Omit<IInputGroupProps, 'className' | 'leftIcon' | 'rightElement'>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  leftIcon?: IconName
  leftIconProps?: IconProps
  rightElement?: IconName
  rightElementProps?: Omit<IconProps, 'name'>
  errorText?: string
  intent?: Intent
  errorInPopover?: boolean
  popoverProps?: PopoverProps
  wrapperClassName?: string
}

export function TextInput(props: TextInputProps): React.ReactElement {
  const {
    errorText,
    intent,
    errorInPopover,
    leftIcon,
    rightElement,
    leftIconProps,
    rightElementProps,
    popoverProps,
    wrapperClassName,
    ...rest
  } = props
  const hasError = Intent.DANGER === intent

  const rightIcon = rightElement ? <Icon name={rightElement} size={12} {...rightElementProps} /> : undefined
  let rightElem = rightIcon

  if (intent === Intent.DANGER && errorText && errorInPopover) {
    rightElem = (
      <div className={css.errorIcon}>
        <Popover
          interactionKind="hover"
          position="bottom-right"
          defaultIsOpen={true}
          lazy={true}
          usePortal={false}
          {...popoverProps}
          content={
            <Text
              padding="medium"
              style={{ maxWidth: '500px', maxHeight: '500px', overflow: 'auto', minWidth: '200px' }}>
              {errorText}
            </Text>
          }>
          <Icon name="deployment-failed-new" size={12} />
        </Popover>
        {rightIcon}
      </div>
    )
  } else if (intent === Intent.SUCCESS) {
    rightElem = <Icon name="tick" size={12} />
  }

  return (
    <div
      className={cx(
        css.main,
        { [css.hasError]: intent === Intent.DANGER },
        { [css.success]: intent === Intent.SUCCESS },
        wrapperClassName
      )}>
      <InputGroup
        {...rest}
        type={props.type || 'text'}
        leftIcon={leftIcon && <Icon name={leftIcon} size={12} {...leftIconProps} />}
        rightElement={rightElem}
      />
      {hasError && !errorInPopover && errorText ? <FormError name={rest.name ?? ''} errorMessage={errorText} /> : null}
    </div>
  )
}
