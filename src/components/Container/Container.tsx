import React, { HTMLAttributes } from 'react'
import { StyledProps, styledClasses, omitStyledProps } from '../../styled-props/StyledProps'
import styledClass from '../../styled-props/StyledProps.css'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement>, StyledProps {
  tag?: keyof JSX.IntrinsicElements
}

export const Container = React.forwardRef(function Container(props: ContainerProps, ref) {
  const { tag = 'div', children } = props
  const Tag = tag as React.ElementType

  return (
    <Tag {...omitStyledProps(props, 'ref')} className={styledClasses(props, styledClass.font)} ref={ref}>
      {children}
    </Tag>
  )
})
