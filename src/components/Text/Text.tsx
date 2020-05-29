import React, { HTMLAttributes, useRef, useLayoutEffect, useState, useEffect } from 'react'
import { Assign } from 'utility-types'
import { StyledProps, styledClasses, omitStyledProps } from '../../styled-props/StyledProps'
import styledCSS from '../../styled-props/StyledProps.css'
import { OptionalTooltip } from '../../core/Types'
import { Utils } from '../../core/Utils'
import css from './Text.css'
import { Icon, IconName, IconProps } from '../../icons/Icon'

export interface TextProps extends Assign<HTMLAttributes<HTMLDivElement>, StyledProps>, OptionalTooltip {
  // When lineClamp is specified, show ... (ellipsis) when text is overflown and show the full text
  // in a tooltip on hover. Note that `tooltip` prop takes precedence over this prop.
  // See more: https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
  lineClamp?: number

  /** Left icon */
  icon?: IconName

  /** Optional props for left icon */
  iconProps?: Partial<IconProps>

  /** Right icon */
  rightIcon?: IconName

  /** Optional props for right icon */
  rightIconProps?: Partial<IconProps>
}

export function Text(props: TextProps) {
  const Tag = (props.inline ? 'span' : 'p') as React.ElementType
  const [tooltip, setTooltip] = useState(props.tooltip)
  const lineClamp = !props.tooltip ? props.lineClamp : null
  const extraClass = lineClamp === 1 ? css.single : lineClamp ? css.multiple : undefined
  const style = { ...props.style }
  const ref = useRef<HTMLElement>()
  const { icon, iconProps, rightIcon, rightIconProps } = props

  if (lineClamp && extraClass) {
    if (lineClamp > 1) {
      ;(style as any)['--text-line-clamp'] = lineClamp // eslint-disable-line
    }
  }

  if (icon || rightIcon) {
    ;(style as any)['display'] = props.inline ? 'inline-flex' : 'flex' // eslint-disable-line
    ;(style as any)['justifyContent'] = 'center' // eslint-disable-line
  }

  useLayoutEffect(() => {
    const heightDifference = (ref.current?.scrollHeight || 0) - (ref.current?.offsetHeight || 0)
    const widthDifference = (ref.current?.scrollWidth || 0) - (ref.current?.offsetWidth || 0)
    // Reason to consider difference more than 1 px is
    // If height is 18.2 Px, chrome taking scrollHeight as 18px and firefox take this as 19px
    // where as offsetHeight both take it as 18px
    if (extraClass && (heightDifference > 1 || widthDifference > 1)) {
      setTooltip(props.children as JSX.Element)
    }
  }, [props.children, props.tooltip, props.tooltipProps])

  useEffect(() => {
    if (props.tooltip) {
      setTooltip(props.tooltip)
    }
  }, [props.tooltip])

  return (
    <Utils.WrapOptionalTooltip tooltip={tooltip} tooltipProps={props.tooltipProps}>
      <Tag
        {...omitStyledProps(
          Object.assign({}, props, { style }),
          'tooltip',
          'tooltipProps',
          'lineClamp',
          'icon',
          'iconProps',
          'rightIcon',
          'rightIconProps'
        )}
        className={styledClasses(props, styledCSS.font, extraClass)}
        ref={ref}>
        {icon && <Icon name={icon} size={16} padding={{ right: 'xsmall' }} {...iconProps} />}
        {props.children}
        {rightIcon && <Icon name={rightIcon} size={16} padding={{ left: 'xsmall' }} {...rightIconProps} />}
      </Tag>
    </Utils.WrapOptionalTooltip>
  )
}
