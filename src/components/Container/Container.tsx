import React from 'react'
import { StyledProps, styledClasses } from '../../styled-props/StyledProps'
import styledClass from '../../styled-props/StyledProps.css'

interface Props extends StyledProps {
  tag?: keyof JSX.IntrinsicElements
}

function Container(props: Props) {
  const { tag = 'div', children } = props
  const Tag = tag as React.ElementType

  return <Tag className={styledClasses(props, styledClass.font)}>{children}</Tag>
}

export { Container }
