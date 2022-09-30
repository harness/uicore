/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import floatingButton from '../../../icons/floating_button.svg'
import css from './FloatingButton.module.css'

export interface FloatingButtonProps {
  onClick?: () => void
  className?: string
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      className={[className, css.btnStyle].join(' ')}
      onClick={onClick}
      style={{
        background: `transparent url(${floatingButton})`
      }}
    />
  )
}

export default FloatingButton
