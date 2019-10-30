import React, { HTMLAttributes } from 'react'
import { Assign } from 'utility-types'
import { StyledProps, styledClasses, omitStyledProps } from '../../styled-props/StyledProps'
import styledClass from '../../styled-props/StyledProps.css'

type HeadingLevel = 1 | 2 | 3 | 4 | '1' | '2' | '3' | '4'

interface Props extends Assign<HTMLAttributes<HTMLHeadingElement>, StyledProps> {
  /** Heading level ('1' -> h1, '2' -> h2, ..., '6' -> h6). Default is '1' */
  level?: HeadingLevel
}

/**
 * Heading renders consistent H1 to H6 elements.
 */
function Heading(props: Props) {
  const { level = 1, children } = props
  const Tag = `h${level}` as React.ElementType

  return (
    <Tag {...omitStyledProps(props)} className={styledClasses(props, styledClass.font, styledClass[`font-h${level}`])}>
      {children}
    </Tag>
  )
}

export { Heading }
