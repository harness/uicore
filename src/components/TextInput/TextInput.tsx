import React from 'react'
import cx from 'classnames'
import { InputGroup, IInputGroupProps, Intent } from '@blueprintjs/core'
import { Popover, PopoverProps } from '../Popover/Popover'
import { IconName, Icon, IconProps } from '../../icons/Icon'
import { Text } from '../Text/Text'

import css from './TextInput.css'

export interface TextInputProps extends Omit<IInputGroupProps, 'className' | 'leftIcon' | 'rightElement'> {
  leftIcon?: IconName
  leftIconProps?: IconProps
  rightElement?: IconName
  rightElementProps?: IconName
  label: string
  errorText?: string
  intent: Intent
  errorInPopover?: boolean
  popoverProps?: PopoverProps
}

export function TextInput(props: TextInputProps) {
  const {
    label,
    errorText,
    intent,
    errorInPopover,
    leftIcon,
    rightElement,
    leftIconProps,
    rightElementProps,
    popoverProps,
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
        { [css.success]: intent === Intent.SUCCESS }
      )}>
      <label className={css.label}>{label}</label>
      <InputGroup
        {...rest}
        type={props.type || 'text'}
        leftIcon={leftIcon && <Icon name={leftIcon} size={12} {...leftIconProps} />}
        rightElement={rightElem}
      />
      {hasError && !errorInPopover ? <div className={css.error}>{errorText}</div> : null}
    </div>
  )
}
