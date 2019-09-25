import React from 'react'
import css from './Text.css'
import { StyledProps, classFromProps } from '../../core/StyledProps'

interface Props extends StyledProps {
  children: React.ReactNode
}

function Text(props: Props) {
  const Tag = `${props.inline ? 'span' : 'p'}` as React.ElementType
  return <Tag className={classFromProps(props, css.text)}>{props.children}</Tag>
}

export { Text }
