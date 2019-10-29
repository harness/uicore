import React, { useState, MouseEvent, ElementType } from 'react'
import { Button as BButton, AnchorButton, IButtonProps } from '@blueprintjs/core'
import css from './Button.css'
import { StyledProps, omitStyledProps, styledClasses } from '../../styled-props/StyledProps'
import styledClass from '../../styled-props/StyledProps.css'
import { Utils } from '../../core/Utils'
import { IconName, Icon } from '../../icons/Icon'

export interface ButtonProps extends Omit<IButtonProps, 'icon' | 'rightIcon' | 'onClick'>, StyledProps {
  icon?: IconName
  rightIcon?: IconName

  /** onClick event handler */
  onClick?: (event: MouseEvent) => Promise<void> | void

  /** If provided, Button render as Link */
  href?: string

  /** Link target attribute, must go with href */
  target?: '_blank'

  /** Link rel attribute, must go with href */
  rel?: string
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

  return (
    <Component
      {...omitStyledProps(props)}
      loading={loading}
      icon={icon && <Icon name={icon} />}
      rightIcon={rightIcon && <Icon name={rightIcon} />}
      onClick={onClick}
      className={styledClasses(props, styledClass.font, css.button, props.href ? css.link : '')}
    />
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
