import React from 'react'
import { StyledProps, styledClasses } from '../../styled-props/StyledProps'
import styledCSS from '../../styled-props/StyledProps.css'

function Text(props: StyledProps) {
  const Tag = `${props.inline ? 'span' : 'p'}` as React.ElementType
  return <Tag className={styledClasses(props, styledCSS.font)}>{props.children}</Tag>
}

export { Text }
