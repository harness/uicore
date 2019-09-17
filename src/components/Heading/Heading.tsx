import React from 'react'
import css from './Heading.css'

export interface Props {
  /** Heading level ('1' -> h1, '2' -> h2, ..., '6' -> h6). Default is '1' */
  level?: '1' | '2' | '3' | '4' | '5' | '6'

  /** Heading intent */
  intent: 'success' | 'error'

  children: React.ReactNode
}

/**
 * Heading renders consistent H1 to H6 elements.
 */
export default function Heading({ level = '1', id, children }: Props) {
  const Tag = `h${level}` as React.ElementType

  return (
    <Tag id={id} className={css.h}>
      {children}
    </Tag>
  )
}
