import React from 'react'
import css from './Heading.css'
import { StyledProps, styledClasses } from '../../core/StyledProps'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'

interface Props extends StyledProps {
  /** Heading level ('1' -> h1, '2' -> h2, ..., '6' -> h6). Default is '1' */
  level?: HeadingLevel
}

/**
 * Heading renders consistent H1 to H6 elements.
 */
function Heading(props: Props) {
  const { level = 1, children } = props
  const Tag = `h${level}` as React.ElementType

  return <Tag className={styledClasses(props, css.main)}>{children}</Tag>
}

export { Heading }
