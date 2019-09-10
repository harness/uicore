import React from 'react'
import css from './Link.css'

interface Props {
  /** Each link must have a unique id to support E2E testing */
  id: string

  /** Link url */
  href: string

  /** Link target */
  target?: string

  /** Link inner content */
  children: React.ReactNode
}

export default function(props: Props) {
  return (
    <a {...props} className={css.link}>
      {props.children}
    </a>
  )
}
