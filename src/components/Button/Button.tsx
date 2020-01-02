import React, { HTMLAttributes, useState, MouseEvent, ElementType } from 'react'
import { Assign } from 'utility-types'
import { Button as BButton, AnchorButton, IButtonProps, Classes } from '@blueprintjs/core'
import css from './Button.css'
import { StyledProps, omitStyledProps, styledClasses } from '../../styled-props/StyledProps'
import styledClass from '../../styled-props/StyledProps.css'
import { PaddingProps } from '../../styled-props/padding/PaddingProps'
import { Utils } from '../../core/Utils'
import { IconName, Icon, IconProps } from '../../icons/Icon'
import { Popover, PopoverProps } from '../Popover/Popover'
import { Text } from '../Text/Text'
import { useIsMounted } from '../../hooks/useIsMounted'

export interface ButtonProps
  extends Assign<
    Omit<IButtonProps, 'icon' | 'rightIcon' | 'onClick'>,
    Assign<HTMLAttributes<HTMLButtonElement>, StyledProps>
  > {
  /** Left icon */
  icon?: IconName

  /** Right icon */
  rightIcon?: IconName

  /** Optional Icon props */
  iconProps?: IconProps

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
  const isMounted = useIsMounted()

  const onClick = async (event: MouseEvent) => {
    // TODO (tan): Improve loading state when props.onClick() is resolved way too fast
    // that showing loading state causes flickering

    if (loading) {
      return
    }

    if (props.onClick) {
      setLoading(true)

      try {
        await props.onClick(event)
      } finally {
        if (isMounted.current) {
          setLoading(false)
        }
      }
    }
  }

  const Component: ElementType = props.href ? AnchorButton : BButton
  // Set icon size to 12px when there's one with button text
  const iconSize = (icon || rightIcon) && (props.text || props.href) ? 12 : undefined
  // Extra left padding for left icon, for right icon, Blueprint already has proper margin
  const leftIconPadding: PaddingProps | undefined = props.text || props.href ? { right: 'xsmall' } : undefined
  const button = (
    <Component
      {...omitStyledProps(props, 'tooltip', 'tooltipProps', 'iconProps')}
      loading={loading}
      icon={icon && <Icon name={icon} size={iconSize} padding={leftIconPadding} {...props.iconProps} />}
      rightIcon={rightIcon && <Icon name={rightIcon} size={iconSize} {...props.iconProps} />}
      onClick={onClick}
      className={styledClasses(
        props,
        styledClass.font,
        css.button,
        props.href && !(props.icon || props.rightIcon) && !props.intent ? css.link : '',
        !props.text && !props.intent && !props.href ? css.iconOnly : ''
      )}
    />
  )

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

  // NextJS does not work well with usePortal={true}
  const isNext =
    typeof window !== 'undefined' && typeof window.next !== 'undefined' && typeof window.__NEXT_DATA__ !== 'undefined'

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
