import React, { HTMLAttributes } from 'react'
import { Assign } from 'utility-types'
import { StyledProps, styledClasses, omitStyledProps } from '../../styled-props/StyledProps'
import styledCSS from '../../styled-props/StyledProps.css'

export type TextProps = Assign<HTMLAttributes<HTMLDivElement>, StyledProps>

export function Text(props: TextProps) {
  const Tag = (props.inline ? 'span' : 'p') as React.ElementType
  return (
    <Tag {...omitStyledProps(props)} className={styledClasses(props, styledCSS.font)}>
      {props.children}
    </Tag>
  )
}
