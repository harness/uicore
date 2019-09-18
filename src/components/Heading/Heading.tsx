import React from 'react'
import css from './Heading.css'
import Intent from '../../core/Intent'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'

export interface Props {
  /** Heading level ('1' -> h1, '2' -> h2, ..., '6' -> h6). Default is '1' */
  level?: HeadingLevel

  /** Heading intent */
  intent?: Intent

  /** Render heading as an inline element instead of a block */
  inline?: boolean

  /** Heading children. Can be any React node */
  children: React.ReactNode
}

/**
 * Heading renders consistent H1 to H6 elements.
 */
export default function Heading({ level = 1, children, inline = false, intent }: Props) {
  const Tag = `h${level}` as React.ElementType
  const attrs = { inline: inline ? 'true' : undefined, intent }

  return (
    <Tag className={css.main} {...attrs}>
      {children}
    </Tag>
  )
}
