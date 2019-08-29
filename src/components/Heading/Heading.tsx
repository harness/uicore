import React from 'react'
import css from './Heading.css'

export interface Props {
  /** A unique id to help Tooltip and UI Automation */
  id: string

  /** Heading level */
  level?: '1' | '2' | '3' | '4' | '5' | '6'

  children: React.ReactNode
}

export default function Heading({ level = '1', id, children }: Props) {
  const Tag = `h${level}` as React.ElementType
  return (
    <Tag id={id} className={css.h}>
      {children}
    </Tag>
  )
}
