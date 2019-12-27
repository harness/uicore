import React from 'react'

import css from './Label.css'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export function Label(props: LabelProps) {
  const { children, ...rest } = props

  return (
    <label {...rest} className={css.main}>
      {children}
    </label>
  )
}
