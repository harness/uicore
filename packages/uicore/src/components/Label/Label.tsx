/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
