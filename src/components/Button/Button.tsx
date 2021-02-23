import { AnchorButton, Button as BButton, IButtonProps } from '@blueprintjs/core'
import React, { ElementType, HTMLAttributes, MouseEvent, useState } from 'react'
import { Assign } from 'utility-types'
import { Config } from '../../core/Config'
import { OptionalTooltip } from '../../core/Types'
import { Utils } from '../../core/Utils'
import { useIsMounted } from '../../hooks/useIsMounted'
import { Icon, IconName, IconProps } from '../../icons/Icon'
import { PaddingProps } from '../../styled-props/padding/PaddingProps'
import { omitStyledProps, styledClasses, StyledProps } from '../../styled-props/StyledProps'
import styledClass from '../../styled-props/StyledProps.css'
import css from './Button.css'

export interface ButtonProps
  extends Assign<
      Omit<IButtonProps, 'icon' | 'rightIcon' | 'onClick'>,
      Assign<HTMLAttributes<HTMLButtonElement>, StyledProps>
    >,
    OptionalTooltip {
  /** Left icon */
  icon?: IconName

  /** Right icon */
  rightIcon?: IconName

  /** Optional Icon props */
  iconProps?: Partial<IconProps>

  /** onClick event handler */
  onClick?: (event: MouseEvent) => Promise<void> | void

  /** Link href. If provided, Button rendered as Link */
  href?: string

  /** When true, ignore all styling (useful for special button and link which need custom styling)  */
  noStyling?: boolean

  /** Link target attribute, must go with href */
  target?: '_blank'

  /** Link rel attribute, must go with href */
  rel?: string

  /** Component children */
  children?: React.ReactNode

  /** Make button round */
  round?: boolean
}

export interface LinkProps extends ButtonProps {
  active?: boolean
  withoutHref?: boolean
}

export function Button(props: ButtonProps): React.ReactElement {
  const { icon, rightIcon, round } = props
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
  const iconSize = (icon || rightIcon) && (props.text || props.href) ? 16 : undefined
  // Extra left padding for left icon, for right icon, Blueprint already has proper margin
  const leftIconPadding: PaddingProps | undefined = props.text || props.href ? { right: 'xsmall' } : undefined
  const Tag = (props.href ? 'a' : 'button') as React.ElementType
  const normalizedProps = omitStyledProps(
    props,
    'icon',
    'tooltip',
    'tooltipProps',
    'iconProps',
    'noStyling',
    'withoutHref'
  )
  const button = props.noStyling ? (
    <Tag {...normalizedProps} />
  ) : (
    <Component
      {...normalizedProps}
      loading={loading}
      icon={icon && <Icon name={icon} size={iconSize} padding={leftIconPadding} {...props.iconProps} />}
      rightIcon={rightIcon && <Icon name={rightIcon} size={iconSize} {...props.iconProps} />}
      onClick={onClick}
      className={styledClasses(
        props,
        styledClass.font,
        css.button,
        props.href && !(props.icon || props.rightIcon) && !props.intent ? css.link : '',
        !props.text && !props.intent && !props.href ? css.iconOnly : '',
        round ? css.round : ''
      )}
    />
  )

  return (
    <Utils.WrapOptionalTooltip tooltip={props.tooltip} tooltipProps={props.tooltipProps}>
      {button}
    </Utils.WrapOptionalTooltip>
  )
}

/**
 * @deprecated use Link from react-router-dom
 */
export function Link(props: LinkProps): React.ReactElement {
  const extra: LinkProps = {}

  // Make sure all _blank target has proper rel
  // @see https://github.com/yannickcr/eslint-plugin,-react/blob/master/docs/rules/jsx-no-target-blank.md
  if (/_blank/i.test(props.target || '')) {
    extra.rel = 'noreferrer noopener'
  }

  // This change is made to make Link compatible with routing pattern at Harness
  if (!Config.DISABLE_LINK_REWRITE && props.href?.startsWith('/') && !props.href?.startsWith('/#/')) {
    extra.href = `/#${props.href}`
  }

  if (props.disabled) {
    extra.onClick = Utils.stopEvent
  }

  if (props.withoutHref) {
    extra.href = '#'
    extra.onClick = event => {
      Utils.stopEvent(event)
      props.onClick?.(event)
    }
    extra.elementRef = element => {
      if (props.withoutHref && element) {
        element.href = 'javascript:void()'
      }
    }
  }

  return <Button {...props} {...extra} />
}
