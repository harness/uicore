import React, { useState, MouseEvent, ElementType } from 'react'
import { Assign } from 'utility-types'
import { Button as BButton, AnchorButton, IButtonProps, Classes } from '@blueprintjs/core'
import css from './Button.css'
import { StyledProps, omitStyledProps, styledClasses } from '../../styled-props/StyledProps'
import styledClass from '../../styled-props/StyledProps.css'
import { Utils } from '../../core/Utils'
import { IconName, Icon } from '../../icons/Icon'
import { Popover, PopoverProps } from '../Popover/Popover'
import { Text } from '../Text/Text'

export interface ButtonProps extends Assign<Omit<IButtonProps, 'icon' | 'rightIcon' | 'onClick'>, StyledProps> {
  /** Left icon */
  icon?: IconName

  /** Right icon */
  rightIcon?: IconName

  /** onClick event handler */
  onClick?: (event: MouseEvent) => Promise<void> | void

  /** Link href. If provided, Button rendered as Link */
  href?: string

  /** Link target attribute, must go with href */
  target?: '_blank'

  /** Link rel attribute, must go with href */
  rel?: string

  /** Component children */
  children?: React.ReactNode

  /** Optional tooltip for Button and Link */
  tooltip?: JSX.Element | string

  /** Optional props for Popover component used to render tooltip - Usually used to pass dark theme */
  tooltipProps?: PopoverProps
}

export interface LinkProps extends ButtonProps {
  active?: boolean
}

export function Button(props: ButtonProps) {
  const { icon, rightIcon } = props
  const [loading, setLoading] = useState(props.loading === true)

  const onClick = async (event: MouseEvent) => {
    if (loading) {
      return
    }

    if (props.onClick) {
      setLoading(true)

      try {
        await props.onClick(event)
      } finally {
        setLoading(false)
      }
    }
  }

  const Component: ElementType = props.href ? AnchorButton : BButton
  const button = (
    <Component
      {...omitStyledProps(props)}
      loading={loading}
      icon={icon && <Icon name={icon} />}
      rightIcon={rightIcon && <Icon name={rightIcon} />}
      onClick={onClick}
      className={styledClasses(props, styledClass.font, props.className || '', css.button, props.href ? css.link : '')}
    />
  )

  /* tslint:disable */
  // @ts-ignore: Special checking for NextJS, portal does not work well under it
  const isNext = typeof next !== 'undefined' && typeof __NEXT_DATA__ !== 'undefined'
  /* tslint:enable */

  const { tooltip, tooltipProps } = props
  const isDark = tooltipProps && tooltipProps.isDark
  const content =
    typeof tooltip === 'string' ? (
      <Text
        padding="medium"
        style={{ maxWidth: '500px', maxHeight: '500px', overflow: 'auto' }}
        color={(isDark && 'white') || undefined}>
        {tooltip}
      </Text>
    ) : (
      tooltip
    )

  return tooltip ? (
    <Popover
      usePortal={!isNext}
      boundary="viewport"
      position="top"
      interactionKind="hover"
      {...tooltipProps}
      popoverClassName={isDark ? Classes.DARK : undefined}
      content={content || ''}>
      {button}
    </Popover>
  ) : (
    button
  )
}

export function Link(props: LinkProps) {
  const extra: LinkProps = {}

  // Make sure all _blank target has proper rel
  // @see https://github.com/yannickcr/eslint-plugin,-react/blob/master/docs/rules/jsx-no-target-blank.md
  if (/_blank/i.test(props.target || '')) {
    extra.rel = 'noreferrer noopener'
  }

  if (props.disabled) {
    extra.onClick = Utils.stopEvent
  }

  return <Button {...props} {...extra} />
}
