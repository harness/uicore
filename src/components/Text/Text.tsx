import React, { HTMLAttributes } from 'react'
import { Assign } from 'utility-types'
import { StyledProps, styledClasses, omitStyledProps } from '../../styled-props/StyledProps'
import styledCSS from '../../styled-props/StyledProps.css'
import { OptionalTooltip } from '../../core/Types'
import { Utils } from '../../core/Utils'

export interface TextProps extends Assign<HTMLAttributes<HTMLDivElement>, StyledProps>, OptionalTooltip {}

export function Text(props: TextProps) {
  const Tag = (props.inline ? 'span' : 'p') as React.ElementType

  return (
    <Utils.WrapOptionalTooltip tooltip={props.tooltip} tooltipProps={props.tooltipProps}>
      <Tag {...omitStyledProps(props, 'tooltip', 'tooltipProps')} className={styledClasses(props, styledCSS.font)}>
        {props.children}
      </Tag>
    </Utils.WrapOptionalTooltip>
  )
}
