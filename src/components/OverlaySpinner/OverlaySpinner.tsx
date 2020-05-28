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
