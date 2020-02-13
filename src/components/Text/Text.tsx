import React, { HTMLAttributes, useRef, useLayoutEffect, useState } from 'react'
import { Assign } from 'utility-types'
import { StyledProps, styledClasses, omitStyledProps } from '../../styled-props/StyledProps'
import styledCSS from '../../styled-props/StyledProps.css'
import { OptionalTooltip } from '../../core/Types'
import { Utils } from '../../core/Utils'
import css from './Text.css'

export interface TextProps extends Assign<HTMLAttributes<HTMLDivElement>, StyledProps>, OptionalTooltip {
  // When lineClamp is specified, show ... (ellipsis) when text is overflown and show the full text
  // in a tooltip on hover. Note that `tooltip` prop takes precedence over this prop.
  // See more: https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
  lineClamp?: number
}

export function Text(props: TextProps) {
  const Tag = (props.inline ? 'span' : 'p') as React.ElementType
  const [tooltip, setTooltip] = useState(props.tooltip)
  const lineClamp = !props.tooltip ? props.lineClamp : null
  const extraClass = lineClamp === 1 ? css.single : lineClamp ? css.multiple : undefined
  const style = { ...props.style }
  const ref = useRef<HTMLElement>()

  if (lineClamp && extraClass) {
    if (lineClamp > 1) {
      ;(style as any)['--text-line-clamp'] = lineClamp // eslint-disable-line
    }
  }

  useLayoutEffect(() => {
    if (
      extraClass &&
      (ref.current?.offsetHeight! < ref.current?.scrollHeight! || ref.current?.offsetWidth! < ref.current?.scrollWidth!) // eslint-disable-line
    ) {
      setTooltip(props.children as JSX.Element)
    }
  }, [props.children, props.tooltip, props.tooltipProps])

  return (
    <Utils.WrapOptionalTooltip tooltip={tooltip} tooltipProps={props.tooltipProps}>
      <Tag
        {...omitStyledProps(Object.assign({}, props, { style }), 'tooltip', 'tooltipProps', 'lineClamp')}
        className={styledClasses(props, styledCSS.font, extraClass)}
        ref={ref}>
        {props.children}
      </Tag>
    </Utils.WrapOptionalTooltip>
  )
}
