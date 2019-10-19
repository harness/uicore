import React from 'react'
import { StyledProps, styledClasses } from '../../core/StyledProps'
import styledCSS from '../../core/StyledProps.css'

function Text(props: StyledProps) {
  const Tag = `${props.inline ? 'span' : 'p'}` as React.ElementType
  return <Tag className={styledClasses(props, styledCSS.font)}>{props.children}</Tag>
}

export { Text }
