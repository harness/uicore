import React from 'react'
import css from './Text.css'
import { StyledProps, styledClasses } from '../../core/StyledProps'

function Text(props: StyledProps) {
  const Tag = `${props.inline ? 'span' : 'p'}` as React.ElementType
  return <Tag className={styledClasses(props, css.text)}>{props.children}</Tag>
}

export { Text }
