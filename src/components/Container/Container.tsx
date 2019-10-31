import React, { HTMLAttributes } from 'react'
import { StyledProps, styledClasses, omitStyledProps } from '../../styled-props/StyledProps'
import { Assign } from 'utility-types'
import styledClass from '../../styled-props/StyledProps.css'

export interface ContainerProps extends Assign<HTMLAttributes<HTMLDivElement>, StyledProps> {
  tag?: keyof JSX.IntrinsicElements
}

export function Container(props: ContainerProps) {
  const { tag = 'div', children } = props
  const Tag = tag as React.ElementType

  return (
    <Tag {...omitStyledProps(props)} className={styledClasses(props, styledClass.font)}>
      {children}
    </Tag>
  )
}
