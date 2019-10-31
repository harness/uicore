import React, { HTMLAttributes } from 'react'
import { StyledProps, styledClasses, omitStyledProps } from '../../styled-props/StyledProps'
import { Assign } from 'utility-types'
import styledClass from '../../styled-props/StyledProps.css'

interface Props extends Assign<HTMLAttributes<HTMLDivElement>, StyledProps> {
  tag?: keyof JSX.IntrinsicElements
}

function Container(props: Props) {
  const { tag = 'div', children } = props
  const Tag = tag as React.ElementType

  return (
    <Tag {...omitStyledProps(props)} className={styledClasses(props, styledClass.font)}>
      {children}
    </Tag>
  )
}

export { Container }
