/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import css from './OverlaySpinner.css'
import { ISpinnerProps, Spinner } from '@blueprintjs/core'
import cx from 'classnames'

export interface OverlaySpinnerProps extends ISpinnerProps {
  show: boolean
  children: React.ReactNode
  className?: string
}

export const OverlaySpinner: React.FC<OverlaySpinnerProps> = props => {
  const { show, children, className = '', ...rest } = props
  return (
    <div className={cx(css.overlaySpinner, className)}>
      {children}
      {show ? (
        <div className={css.overlay}>
          <Spinner {...rest} />
        </div>
      ) : null}
    </div>
  )
}
