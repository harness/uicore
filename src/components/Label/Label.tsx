import React from 'react'
import cx from 'classnames'
import css from './Label.css'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export function Label(props: LabelProps) {
  const { children, className = '', ...rest } = props

  return (
    <label {...rest} className={cx(css.main, className)}>
      {children}
    </label>
  )
}
