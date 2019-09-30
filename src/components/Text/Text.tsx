import React from 'react'
import css from './Text.css'
import { StyledProps, classFromStyledProps } from '../../core/StyledProps'

interface Props extends Omit<StyledProps, 'spacing'> {
  children: React.ReactNode
}

function Text(props: Props) {
  const Tag = `${props.inline ? 'span' : 'p'}` as React.ElementType
  return <Tag className={classFromStyledProps(props, css.text)}>{props.children}</Tag>
}

export { Text }
