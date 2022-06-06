/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import css from './OverlaySpinner.css'
import { ISpinnerProps, Spinner } from '@blueprintjs/core'

export interface OverlaySpinnerProps extends ISpinnerProps {
  show: boolean
  children: React.ReactNode
}

export const OverlaySpinner: React.FC<OverlaySpinnerProps> = props => {
  const { show, children, ...rest } = props
  return (
    <div className={css.overlaySpinner}>
      {children}
      {show ? (
        <div className={css.overlay}>
          <Spinner {...rest} />
        </div>
      ) : null}
    </div>
  )
}
