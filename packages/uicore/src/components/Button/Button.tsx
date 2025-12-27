/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { AnchorButton, Button as BButton, ButtonProps as BpButtonProps } from '@blueprintjs/core'
import cx from 'classnames'
import { HarnessDocTooltip } from '../../frameworks/Tooltip/Tooltip'
import React, { ButtonHTMLAttributes, ElementType, MouseEvent, useState } from 'react'
import { Config } from '../../core/Config'
import {
  omitStyledProps,
  OptionalTooltip,
  PaddingProps,
  styledClass,
  styledClasses,
  StyledProps
} from '@harness/design-system'
import { Utils } from '../../core/Utils'
import { useIsMounted } from '../../hooks/useIsMounted'
import { Icon, IconName, IconProps } from '@harness/icons'
import css from './Button.css'

export enum ButtonVariation {
  PRIMARY = 'variation-primary',
  SECONDARY = 'variation-secondary',
  TERTIARY = 'variation-tertiary',
  ICON = 'variation-icon',
  LINK = 'variation-link',
  AI = 'variation-ai',
  AI_PRIMARY = 'variation-ai-primary',
  AI_SECONDARY = 'variation-ai-secondary'
}

export enum ButtonSize {
  LARGE = 'large',
  MEDIUM = 'medium', // default
  SMALL = 'small'
}

export interface ButtonProps
  extends Omit<BpButtonProps<HTMLButtonElement>, 'icon' | 'rightIcon' | 'onClick' | 'onFocus' | 'onBlur'>,
    ButtonHTMLAttributes<HTMLButtonElement>,
    StyledProps,
    OptionalTooltip {
  /** Left icon */
  icon?: IconName

  /** Right icon */
  rightIcon?: IconName

  /** Optional Icon props */
  iconProps?: Partial<IconProps>

  withoutCurrentColor?: boolean

  withoutBoxShadow?: boolean

  /** onClick event handler */
  onClick?: (event: MouseEvent) => Promise<unknown> | void

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

  variation?: ButtonVariation

  size?: ButtonSize
}

export interface LinkProps extends ButtonProps {
  active?: boolean
  withoutHref?: boolean
}

export function Button(props: ButtonProps): React.ReactElement {
  const { icon, rightIcon, round, variation, size, loading: propLoading = false } = props
  const [internalLoading, setInternalLoading] = useState(propLoading)
  const isMounted = useIsMounted()
  const loading = internalLoading || propLoading

  const onClick = async (event: MouseEvent) => {
    // TODO (tan): Improve loading state when props.onClick() is resolved way too fast
    // that showing loading state causes flickering

    if (loading) {
      return
    }

    if (props.onClick) {
      setInternalLoading(true)

      try {
        await props.onClick(event)
      } finally {
        if (isMounted.current) {
          setInternalLoading(false)
        }
      }
    }
  }

  const Component: ElementType = props.href || (props.disabled && props.tooltip) ? AnchorButton : BButton
  // Set icon size to 12px when there's one with button text
  const iconSize =
    (icon || rightIcon) && (props.text || props.href) ? (variation && size === ButtonSize.LARGE ? 24 : 16) : undefined
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
    'withoutHref',
    'withoutCurrentColor',
    'withoutBoxShadow',
    'variation',
    'size'
  )

  let buttonAriaLabel = !props.text && typeof props.tooltip === 'string' ? props.tooltip : ''

  // In case a Button has text as a string, set aria label as text
  if (typeof props.text === 'string') {
    buttonAriaLabel = props.text
  }

  const isAIButton = variation === ButtonVariation.AI_PRIMARY || variation === ButtonVariation.AI_SECONDARY

  const ariaLabelProps = buttonAriaLabel ? { 'aria-label': buttonAriaLabel } : {}

  const button = props.noStyling ? (
    <Tag {...normalizedProps} />
  ) : (
    <Component
      {...ariaLabelProps}
      {...normalizedProps}
      loading={loading}
      icon={icon && <Icon name={icon} size={iconSize} padding={leftIconPadding} {...props.iconProps} />}
      rightIcon={rightIcon && <Icon name={rightIcon} size={iconSize} {...props.iconProps} />}
      onClick={onClick}
      className={cx(
        css.button,
        styledClass.font,
        styledClasses(props),
        {
          [css['with-current-color']]: !props.withoutCurrentColor,
          [css.round]: round,
          [css.iconOnly]: !props.text && !props.intent && !props.href,
          [css.link]: props.href && !(props.icon || props.rightIcon) && !props.intent,
          [css['without-shadow']]: props.withoutBoxShadow || props.minimal,
          [css.withLeftIcon]: icon,
          [css.withRightIcon]: rightIcon
        },
        isAIButton ? cx(css.ai, css[variation]) : '',
        variation ? cx(css.variation, css[variation]) : '',
        size ? cx(css.size, css[size]) : ''
      )}
    />
  )

  const wrappeInTooltip = (
    <Utils.WrapOptionalTooltip tooltip={props.tooltip} tooltipProps={props.tooltipProps}>
      {button}
    </Utils.WrapOptionalTooltip>
  )

  return props.tooltipProps?.dataTooltipId ? (
    <div className={css.withDocsTooltip} data-tooltip-id={props.tooltipProps.dataTooltipId}>
      {wrappeInTooltip}
      <HarnessDocTooltip tooltipId={props.tooltipProps.dataTooltipId} useStandAlone={true} />
    </div>
  ) : (
    wrappeInTooltip
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
        ;((element as unknown) as HTMLAnchorElement).href = 'javascript:void()'
      }
    }
  }

  return <Button {...props} {...extra} />
}
