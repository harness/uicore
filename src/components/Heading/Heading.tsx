import React from 'react'
import { StyledProps, styledClasses } from '../../core/StyledProps'
import styledCSS from '../../core/StyledProps.css'

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

  return <Tag className={styledClasses(props, styledCSS.font)}>{children}</Tag>
}

export { Heading }
